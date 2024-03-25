'use client';
import { useContext, useEffect, useState } from 'react';
import tmdb from '@/libs/tmdb';
import GlobalContext from 'app/context/GlobalContext';
import * as Vibrant from 'node-vibrant';
import { movieImagePath } from '@/libs/movieImagePath';

const Movie = ({ params: { mid } }) => {
  const [data, setData] = useState({});
  const { setLoading } = useContext(GlobalContext);
  const fetchDetails = async () => {
    const { data: movieData } = await tmdb.get(`/movie/${mid}`);
    console.log(movieImagePath(movieData.backdrop_path));
    const palette = await Vibrant.from(
      movieImagePath(movieData.backdrop_path)
    ).getPalette();
    console.log(palette?.DarkMuted?.rgb.join(','));
    setLoading(false);
    setData({ ...movieData, palette });
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  console.log(data?.backdrop_path);

  return (
    <div>
      <div
        style={{
          background: `linear-gradient(to right, rgba(0,0,0,0.99), rgba(${data?.palette?.DarkMuted?.rgb.join(',')},0.9)), url('${movieImagePath(data?.backdrop_path, true)}') no-repeat top center/cover`,
        }}
        className="relative"
      >
        <div className="m-auto flex w-full max-w-7xl gap-x-10 px-8 py-8">
          <div>
            <div className="w-60 min-w-60 overflow-hidden rounded-lg object-cover object-center shadow-lg">
              <img
                className="h-full w-full"
                src={
                  data.poster_path
                    ? movieImagePath(data.poster_path)
                    : '/images/poster-placeholder.png'
                }
              />
            </div>
          </div>
          <div
            className="grid gap-y-6"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <div>
              <p className="text-zinc-400">{data.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Movie;
