'use client';

import { useEffect, useState } from 'react';
import tmdb from '../../../libs/tmdb';
import Carousel from '@/app/components/Carousel';

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await tmdb.get('/movie/popular');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setPopularMovies(response.data.results);
    };
    void fetchMovies();
  }, []);

  return (
    <div>
      <div>
        <div>Popular</div>
        <Carousel data={popularMovies} />
      </div>
    </div>
  );
};
export default Movies;
