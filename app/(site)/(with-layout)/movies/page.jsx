'use client';

import { useEffect, useState } from 'react';
import tmdb from '../../../libs/tmdb';
import React from 'react';
import Carousel from '../../../components/Carousel';
import async from 'async';

const Movies = () => {
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

  useEffect(() => {
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
      console.log(temp);
      setMovies(temp);
    };
    fetchMovies();
  }, []);

  return (
    <div className="w-full">
      {movies.map((movie, index) => (
        <div key={index}>
          <div>{movie.title}</div>
          <Carousel data={movie.data} />
        </div>
      ))}
    </div>
  );
};
export default Movies;
