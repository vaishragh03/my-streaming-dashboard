import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const TMDB_IMAGE_BASE_URL_W500 = 'https://image.tmdb.org/t/p/w500';

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

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

export const tmdbApi = {
  getTrending: async (): Promise<Movie[]> => {
    const response = await axios.get(`${TMDB_BASE_URL}/trending/all/week`, {
      params: { api_key: apiKey },
    });
    return response.data.results;
  },

  getNetflixOriginals: async (): Promise<Movie[]> => {
    const response = await axios.get(`${TMDB_BASE_URL}/discover/tv`, {
      params: {
        api_key: apiKey,
        with_networks: 213,
      },
    });
    return response.data.results;
  },

  getTopRated: async (): Promise<Movie[]> => {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/top_rated`, {
      params: { api_key: apiKey },
    });
    return response.data.results;
  },

  getActionMovies: async (): Promise<Movie[]> => {
    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: apiKey,
        with_genres: 28,
      },
    });
    return response.data.results;
  },

  getComedyMovies: async (): Promise<Movie[]> => {
    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: apiKey,
        with_genres: 35,
      },
    });
    return response.data.results;
  },

  getHorrorMovies: async (): Promise<Movie[]> => {
    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: apiKey,
        with_genres: 27,
      },
    });
    return response.data.results;
  },

  getRomanceMovies: async (): Promise<Movie[]> => {
    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: apiKey,
        with_genres: 10749,
      },
    });
    return response.data.results;
  },

  getDocumentaries: async (): Promise<Movie[]> => {
    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: apiKey,
        with_genres: 99,
      },
    });
    return response.data.results;
  },

  getMovieDetails: async (id: number, type: 'movie' | 'tv' = 'movie'): Promise<MovieDetails> => {
    const response = await axios.get(`${TMDB_BASE_URL}/${type}/${id}`, {
      params: { api_key: apiKey },
    });
    return response.data;
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    const response = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
      params: {
        api_key: apiKey,
        query,
      },
    });
    return response.data.results;
  },
};

export const getImageUrl = (path: string | null, size: 'original' | 'w500' = 'original'): string => {
  if (!path) return '/placeholder.jpg';
  return size === 'original' 
    ? `${TMDB_IMAGE_BASE_URL}${path}` 
    : `${TMDB_IMAGE_BASE_URL_W500}${path}`;
};

