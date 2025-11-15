import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { genreId: string } }
) {
  const apiKey = process.env.TMDB_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${params.genreId}`
    );
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json({ error: 'TMDB API error' }, { status: response.status });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}

