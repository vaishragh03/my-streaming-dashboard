'use client';

import { useRef } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { Movie } from '@/lib/tmdb';
import MovieCard from './MovieCard';

interface RowProps {
  title: string;
  movies: Movie[];
  isLargeRow?: boolean;
}

const Row = ({ title, movies, isLargeRow = false }: RowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-2 md:space-y-4 px-4 md:px-8">
      <h2 className="text-white text-xl md:text-2xl font-semibold">{title}</h2>
      <div className="group relative">
        <HiChevronLeft
          className="absolute left-0 top-0 bottom-0 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 bg-netflix-black bg-opacity-50 rounded-full"
          onClick={() => scroll('left')}
        />
        <div
          ref={rowRef}
          className="flex items-center space-x-2 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isLarge={isLargeRow} />
          ))}
        </div>
        <HiChevronRight
          className="absolute right-0 top-0 bottom-0 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 bg-netflix-black bg-opacity-50 rounded-full"
          onClick={() => scroll('right')}
        />
      </div>
    </div>
  );
};

export default Row;

