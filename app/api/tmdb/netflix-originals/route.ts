import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.TMDB_API_KEY;
  
  if (!apiKey) {
    console.error('TMDB_API_KEY not configured');
    return NextResponse.json(
      { error: 'API key not configured', details: 'TMDB_API_KEY environment variable is missing' },
      { status: 500 }
    );
  }

  try {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_networks=213`;
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
    console.error('Failed to fetch Netflix originals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Netflix originals', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

