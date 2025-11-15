import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';
import Header from '@/components/Header';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl text-gray-400 mb-8">Movie Not Found</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          The movie or TV show you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 bg-netflix-red text-white px-6 py-3 rounded hover:bg-opacity-80 transition font-semibold"
        >
          <HiArrowLeft className="text-xl" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}

