import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const apiKey = process.env.TMDB_API_KEY;
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  if (!query) {
    return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json({ error: 'TMDB API error' }, { status: response.status });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to search' }, { status: 500 });
  }
}

