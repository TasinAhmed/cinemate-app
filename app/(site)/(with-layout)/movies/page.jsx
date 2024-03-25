'use client';

import { use, useContext, useEffect, useState } from 'react';
import tmdb from '@/libs/tmdb';
import React from 'react';
import Carousel from '@/components/Carousel';
import async from 'async';
import GlobalContext from 'app/context/GlobalContext';

const Movies = () => {
  const { setLoading } = useContext(GlobalContext);
  const [movies, setMovies] = useState([
    {
      title: 'Now Playing',
      url: '/movie/now_playing',
      data: [],
    },
    {
      title: 'Popular',
      url: '/movie/popular',
      data: [],
    },
    {
      title: 'Top Rated',
      url: '/movie/top_rated',
      data: [],
    },
    {
      title: 'Upcoming',
      url: '/movie/upcoming',
      data: [],
    },
  ]);

  const fetchMovies = async () => {
    const response = await async.parallel(
      movies.map((movie) => {
        return async () => {
          const response = await tmdb.get(movie.url);
          return response.data.results;
        };
      })
    );
    let temp = [...movies];
    response.forEach((data, index) => {
      temp[index].data = data;
    });
    console.log('test movies');
    setMovies(temp);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="m-auto w-full max-w-7xl p-8">
      {movies[0].data.length > 0 &&
        movies.map((movie, index) => (
          <div key={index}>
            <div>{movie.title}</div>
            <Carousel data={movie.data} />
          </div>
        ))}
    </div>
  );
};
export default Movies;
