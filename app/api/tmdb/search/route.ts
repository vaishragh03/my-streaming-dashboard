import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const apiKey = process.env.TMDB_API_KEY;
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  
  if (!apiKey) {
    console.error('TMDB_API_KEY not configured');
    return NextResponse.json(
      { error: 'API key not configured', details: 'TMDB_API_KEY environment variable is missing' },
      { status: 500 }
    );
  }

  if (!query) {
    return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
  }

  try {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
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
    console.error('Failed to search:', error);
    return NextResponse.json(
      { error: 'Failed to search', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

