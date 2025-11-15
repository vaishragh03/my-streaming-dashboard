import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const apiKey = process.env.TMDB_API_KEY;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'movie';
  const { id } = await params;
  
  if (!apiKey) {
    console.error('TMDB_API_KEY not configured');
    return NextResponse.json(
      { error: 'API key not configured', details: 'TMDB_API_KEY environment variable is missing' },
      { status: 500 }
    );
  }

  try {
    const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`;
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('TMDB API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'TMDB API error', status: response.status, details: errorText },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Failed to fetch movie details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movie details', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

