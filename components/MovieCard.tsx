'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/lib/tmdb';
import { getImageUrl } from '@/lib/tmdb';
import { HiPlay, HiInformationCircle } from 'react-icons/hi';

interface MovieCardProps {
  movie: Movie;
  isLarge?: boolean;
}

const MovieCard = ({ movie, isLarge = false }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative transition-transform duration-300 ${
        isLarge ? 'min-w-[250px] h-[140px]' : 'min-w-[200px] h-[120px]'
      } ${isHovered ? 'scale-110 z-10' : 'scale-100'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/movie/${movie.id}`}>
        <div className="relative w-full h-full rounded overflow-hidden cursor-pointer group">
          <Image
            src={getImageUrl(movie.poster_path || movie.backdrop_path, 'w500')}
            alt={movie.title || movie.name || 'Movie'}
            fill
            className="object-cover group-hover:opacity-80 transition-opacity"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-netflix-black bg-opacity-90 flex flex-col justify-end p-4">
              <div className="flex space-x-2 mb-2">
                <button 
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black hover:bg-opacity-80 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    // Play functionality can be added here
                  }}
                >
                  <HiPlay className="text-lg" />
                </button>
                <Link
                  href={`/movie/${movie.id}`}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-white hover:bg-opacity-80 transition"
                >
                  <HiInformationCircle className="text-lg" />
                </Link>
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">
                {movie.title || movie.name}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span>{movie.vote_average.toFixed(1)}</span>
                <span>•</span>
                <span>{movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4)}</span>
              </div>
              <p className="text-xs text-gray-300 mt-2 line-clamp-2">
                {movie.overview}
              </p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;

