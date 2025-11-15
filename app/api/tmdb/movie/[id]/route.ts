import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const apiKey = process.env.TMDB_API_KEY;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'movie';
  
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${params.id}?api_key=${apiKey}`
    );
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json({ error: 'TMDB API error' }, { status: response.status });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch movie details' }, { status: 500 });
  }
}

