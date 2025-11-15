'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HiSearch, HiBell, HiX } from 'react-icons/hi';
import Link from 'next/link';
import { tmdbApi, Movie } from '@/lib/tmdb';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const searchMovies = async () => {
      if (searchQuery.trim().length > 2) {
        setIsSearching(true);
        try {
          const results = await tmdbApi.searchMovies(searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimer = setTimeout(() => {
      searchMovies();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleMovieClick = (movieId: number) => {
    router.push(`/movie/${movieId}`);
    handleCloseSearch();
  };

  // Close search when clicking outside
  useEffect(() => {
    if (!isSearchOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.search-container')) {
        handleCloseSearch();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-netflix-black' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 lg:px-10 py-4">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center">
            <h1 className="text-netflix-red text-2xl font-bold">STREAMFLIX</h1>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-white hover:text-gray-300 transition">
              Home
            </Link>
            <Link href="/" className="text-white hover:text-gray-300 transition">
              TV Shows
            </Link>
            <Link href="/" className="text-white hover:text-gray-300 transition">
              Movies
            </Link>
            <Link href="/" className="text-white hover:text-gray-300 transition">
              New & Popular
            </Link>
            <Link href="/" className="text-white hover:text-gray-300 transition">
              My List
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {isSearchOpen ? (
            <div className="relative flex items-center space-x-2 search-container">
              <div className="relative">
                <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search movies and TV shows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-netflix-black border border-white text-white pl-10 pr-4 py-2 rounded w-64 md:w-96 focus:outline-none focus:border-netflix-red"
                  autoFocus
                />
                <button
                  onClick={handleCloseSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                >
                  <HiX className="text-xl" />
                </button>
              </div>
              {/* Search Results Dropdown */}
              {searchQuery.trim().length > 2 && (
                <div className="absolute top-full right-0 mt-2 w-64 md:w-96 bg-netflix-black border border-gray-700 rounded-lg shadow-xl max-h-96 overflow-y-auto">
                  {isSearching ? (
                    <div className="p-4 text-center text-gray-400">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.slice(0, 10).map((movie) => (
                        <button
                          key={movie.id}
                          onClick={() => handleMovieClick(movie.id)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-800 transition flex items-center space-x-3"
                        >
                          <div className="flex-shrink-0 w-12 h-16 bg-gray-700 rounded overflow-hidden">
                            {movie.poster_path && (
                              <img
                                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                alt={movie.title || movie.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold truncate">
                              {movie.title || movie.name}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4)}
                              {movie.vote_average > 0 && (
                                <> • ⭐ {movie.vote_average.toFixed(1)}</>
                              )}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-400">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <HiSearch
              className="text-white text-2xl cursor-pointer hover:text-gray-300 transition"
              onClick={handleSearchClick}
            />
          )}
          <HiBell className="text-white text-2xl cursor-pointer hover:text-gray-300 transition" />
          <div className="w-8 h-8 rounded bg-gray-600 cursor-pointer hover:bg-gray-500 transition"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;

