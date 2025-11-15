'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Row from '@/components/Row';
import { Movie, tmdbApi } from '@/lib/tmdb';

export default function Home() {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [netflixOriginals, setNetflixOriginals] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);
  const [romanceMovies, setRomanceMovies] = useState<Movie[]>([]);
  const [documentaries, setDocumentaries] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          trendingData,
          netflixData,
          topRatedData,
          actionData,
          comedyData,
          horrorData,
          romanceData,
          documentariesData,
        ] = await Promise.all([
          tmdbApi.getTrending(),
          tmdbApi.getNetflixOriginals(),
          tmdbApi.getTopRated(),
          tmdbApi.getActionMovies(),
          tmdbApi.getComedyMovies(),
          tmdbApi.getHorrorMovies(),
          tmdbApi.getRomanceMovies(),
          tmdbApi.getDocumentaries(),
        ]);

        setTrending(trendingData);
        setNetflixOriginals(netflixData);
        setTopRated(topRatedData);
        setActionMovies(actionData);
        setComedyMovies(comedyData);
        setHorrorMovies(horrorData);
        setRomanceMovies(romanceData);
        setDocumentaries(documentariesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-netflix-black">
      <Header />
      <Hero />
      <section className="relative mt-[-100px] z-10">
        <Row title="Trending Now" movies={trending} />
        <Row title="Netflix Originals" movies={netflixOriginals} isLargeRow />
        <Row title="Top Rated" movies={topRated} />
        <Row title="Action Movies" movies={actionMovies} />
        <Row title="Comedy Movies" movies={comedyMovies} />
        <Row title="Horror Movies" movies={horrorMovies} />
        <Row title="Romance Movies" movies={romanceMovies} />
        <Row title="Documentaries" movies={documentaries} />
      </section>
    </main>
  );
}

