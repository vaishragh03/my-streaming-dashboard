const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const TMDB_IMAGE_BASE_URL_W500 = 'https://image.tmdb.org/t/p/w500';

export interface Movie {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  media_type?: string;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime?: number;
  episode_run_time?: number[];
  status: string;
  tagline?: string;
  production_companies: { id: number; name: string; logo_path: string | null }[];
}

// Helper function to fetch from our API routes
async function fetchFromApi(endpoint: string) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const response = await fetch(`${baseUrl}${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
}

export const tmdbApi = {
  getTrending: async (): Promise<Movie[]> => {
    const data = await fetchFromApi('/api/tmdb/trending');
    return data.results;
  },

  getNetflixOriginals: async (): Promise<Movie[]> => {
    const data = await fetchFromApi('/api/tmdb/netflix-originals');
    return data.results;
  },

  getTopRated: async (): Promise<Movie[]> => {
    const data = await fetchFromApi('/api/tmdb/top-rated');
    return data.results;
  },

  getActionMovies: async (): Promise<Movie[]> => {
    const data = await fetchFromApi('/api/tmdb/genre/28');
    return data.results;
  },

  getComedyMovies: async (): Promise<Movie[]> => {
    const data = await fetchFromApi('/api/tmdb/genre/35');
    return data.results;
  },

  getHorrorMovies: async (): Promise<Movie[]> => {
    const data = await fetchFromApi('/api/tmdb/genre/27');
    return data.results;
  },

  getRomanceMovies: async (): Promise<Movie[]> => {
    const data = await fetchFromApi('/api/tmdb/genre/10749');
    return data.results;
  },

  getDocumentaries: async (): Promise<Movie[]> => {
    const data = await fetchFromApi('/api/tmdb/genre/99');
    return data.results;
  },

  getMovieDetails: async (id: number, type: 'movie' | 'tv' = 'movie'): Promise<MovieDetails> => {
    return await fetchFromApi(`/api/tmdb/movie/${id}?type=${type}`);
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    const data = await fetchFromApi(`/api/tmdb/search?query=${encodeURIComponent(query)}`);
    return data.results;
  },
};

export const getImageUrl = (path: string | null, size: 'original' | 'w500' = 'original'): string => {
  if (!path) return '/placeholder.jpg';
  return size === 'original' 
    ? `${TMDB_IMAGE_BASE_URL}${path}` 
    : `${TMDB_IMAGE_BASE_URL_W500}${path}`;
};

