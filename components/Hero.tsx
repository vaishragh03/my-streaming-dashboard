'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Movie } from '@/lib/tmdb';
import { tmdbApi, getImageUrl } from '@/lib/tmdb';
import { HiPlay, HiInformationCircle } from 'react-icons/hi';
import Image from 'next/image';

const Hero = () => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const movies = await tmdbApi.getNetflixOriginals();
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setFeaturedMovie(randomMovie);
      } catch (error) {
        console.error('Error fetching featured movie:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMovie();
  }, []);

  if (loading || !featuredMovie) {
    return (
      <div className="relative h-[56.25vw] min-h-[400px] bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  const truncateOverview = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <div className="relative h-[56.25vw] min-h-[400px]">
      <div className="absolute inset-0">
        <Image
          src={getImageUrl(featuredMovie.backdrop_path)}
          alt={featuredMovie.title || featuredMovie.name || 'Featured'}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
      </div>

      <div className="absolute bottom-[35%] left-4 md:left-16 max-w-xl z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          {featuredMovie.title || featuredMovie.name}
        </h1>
        <div className="flex items-center space-x-4 mb-4">
          <button className="flex items-center space-x-2 bg-white text-black px-6 py-2 rounded hover:bg-opacity-80 transition font-semibold">
            <HiPlay className="text-2xl" />
            <span>Play</span>
          </button>
          <button
            onClick={() => router.push(`/movie/${featuredMovie.id}`)}
            className="flex items-center space-x-2 bg-gray-600 bg-opacity-70 text-white px-6 py-2 rounded hover:bg-opacity-90 transition font-semibold"
          >
            <HiInformationCircle className="text-2xl" />
            <span>More Info</span>
          </button>
        </div>
        <p className="text-white text-sm md:text-lg drop-shadow-lg line-clamp-3">
          {truncateOverview(featuredMovie.overview, 150)}
        </p>
      </div>
    </div>
  );
};

export default Hero;

