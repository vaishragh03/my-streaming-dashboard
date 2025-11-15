import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { tmdbApi, getImageUrl, MovieDetails } from '@/lib/tmdb';
import { omdbApi } from '@/lib/omdb';
import Header from '@/components/Header';
import { HiArrowLeft, HiPlay, HiStar } from 'react-icons/hi';

interface MoviePageProps {
  params: {
    id: string;
  };
}

async function getMovieDetails(id: string): Promise<MovieDetails | null> {
  const apiKey = process.env.TMDB_API_KEY;
  
  if (!apiKey) {
    console.error('TMDB_API_KEY not configured');
    return null;
  }

  try {
    // Try to fetch as movie first
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`,
        { next: { revalidate: 3600 } } // Cache for 1 hour
      );
      
      if (response.ok) {
        const movie = await response.json();
        if (movie && movie.id) {
          return movie;
        }
      }
    } catch (movieError) {
      // Movie not found, try TV show
    }
    
    // If not found as movie, try as TV show
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`,
        { next: { revalidate: 3600 } } // Cache for 1 hour
      );
      
      if (response.ok) {
        const tvShow = await response.json();
        if (tvShow && tvShow.id) {
          return tvShow;
        }
      }
    } catch (tvError) {
      // TV show not found
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

export default async function MovieDetailPage({ params }: MoviePageProps) {
  const movie = await getMovieDetails(params.id);

  if (!movie) {
    notFound();
  }

  // Try to get additional details from OMDB
  const omdbDetails = await omdbApi.getMovieDetails(
    movie.title || movie.name || '',
    movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4)
  );

  const releaseDate = movie.release_date || movie.first_air_date || '';
  const runtime = movie.runtime || movie.episode_run_time?.[0] || 0;
  const mediaType = movie.media_type || (movie.first_air_date ? 'tv' : 'movie');

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      {/* Backdrop Image */}
      <div className="relative h-[70vh] w-full">
        <Image
          src={getImageUrl(movie.backdrop_path || movie.poster_path)}
          alt={movie.title || movie.name || 'Movie'}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 -mt-32 px-4 md:px-16 pb-16">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-white hover:text-gray-300 transition mb-8"
        >
          <HiArrowLeft className="text-2xl" />
          <span>Back to Home</span>
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <div className="relative w-[200px] h-[300px] md:w-[300px] md:h-[450px] rounded-lg overflow-hidden">
              <Image
                src={getImageUrl(movie.poster_path || movie.backdrop_path, 'w500')}
                alt={movie.title || movie.name || 'Movie'}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {movie.title || movie.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <HiStar className="text-yellow-400 text-xl" />
                <span className="text-white font-semibold">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-400">
                  ({movie.vote_count.toLocaleString()} votes)
                </span>
              </div>
              {releaseDate && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-white">{releaseDate.substring(0, 4)}</span>
                </>
              )}
              {runtime > 0 && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-white">{runtime} min</span>
                </>
              )}
              <span className="text-gray-400">•</span>
              <span className="text-white capitalize">{mediaType}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 mb-6">
              <button className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded hover:bg-opacity-80 transition font-semibold">
                <HiPlay className="text-2xl" />
                <span>Play</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-600 bg-opacity-70 text-white px-8 py-3 rounded hover:bg-opacity-90 transition font-semibold">
                <span>+ My List</span>
              </button>
            </div>

            {/* Overview */}
            {movie.overview && (
              <div className="mb-6">
                <h2 className="text-white text-xl font-semibold mb-2">Overview</h2>
                <p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p>
              </div>
            )}

            {/* Tagline */}
            {movie.tagline && (
              <p className="text-gray-400 italic mb-6">"{movie.tagline}"</p>
            )}

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional OMDB Details */}
            {omdbDetails && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {omdbDetails.Director && omdbDetails.Director !== 'N/A' && (
                  <div>
                    <span className="text-gray-400">Director: </span>
                    <span className="text-white">{omdbDetails.Director}</span>
                  </div>
                )}
                {omdbDetails.Writer && omdbDetails.Writer !== 'N/A' && (
                  <div>
                    <span className="text-gray-400">Writer: </span>
                    <span className="text-white">{omdbDetails.Writer}</span>
                  </div>
                )}
                {omdbDetails.Actors && omdbDetails.Actors !== 'N/A' && (
                  <div>
                    <span className="text-gray-400">Cast: </span>
                    <span className="text-white">{omdbDetails.Actors}</span>
                  </div>
                )}
                {omdbDetails.imdbRating && omdbDetails.imdbRating !== 'N/A' && (
                  <div>
                    <span className="text-gray-400">IMDB Rating: </span>
                    <span className="text-white">{omdbDetails.imdbRating}/10</span>
                  </div>
                )}
                {omdbDetails.Rated && omdbDetails.Rated !== 'N/A' && (
                  <div>
                    <span className="text-gray-400">Rated: </span>
                    <span className="text-white">{omdbDetails.Rated}</span>
                  </div>
                )}
              </div>
            )}

            {/* Production Companies */}
            {movie.production_companies && movie.production_companies.length > 0 && (
              <div className="mt-6">
                <h3 className="text-white font-semibold mb-2">Production</h3>
                <div className="flex flex-wrap gap-4">
                  {movie.production_companies.slice(0, 5).map((company) => (
                    <div key={company.id} className="flex items-center">
                      {company.logo_path ? (
                        <Image
                          src={getImageUrl(company.logo_path, 'w500')}
                          alt={company.name}
                          width={100}
                          height={50}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-gray-400">{company.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

