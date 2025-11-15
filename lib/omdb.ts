import axios from 'axios';

const OMDB_BASE_URL = 'https://www.omdbapi.com';
const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;

export interface OMDBMovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export const omdbApi = {
  getMovieDetails: async (title: string, year?: string): Promise<OMDBMovieDetails | null> => {
    try {
      const response = await axios.get(OMDB_BASE_URL, {
        params: {
          apikey: apiKey,
          t: title,
          y: year,
        },
      });
      
      if (response.data.Response === 'False') {
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error('OMDB API Error:', error);
      return null;
    }
  },

  getMovieByIMDB: async (imdbId: string): Promise<OMDBMovieDetails | null> => {
    try {
      const response = await axios.get(OMDB_BASE_URL, {
        params: {
          apikey: apiKey,
          i: imdbId,
        },
      });
      
      if (response.data.Response === 'False') {
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error('OMDB API Error:', error);
      return null;
    }
  },
};

