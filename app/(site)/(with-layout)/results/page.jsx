'use client';

import GlobalContext from 'app/context/GlobalContext';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import tmdb from '@/libs/tmdb';
import LinesEllipsis from 'react-lines-ellipsis';
import { movieImagePath } from '@/libs/movieImagePath';

const Results = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search_query');
  const [data, setData] = useState({});
  const router = useRouter();
  const { setLoading } = useContext(GlobalContext);

  useEffect(() => {
    setLoading(true);
    const fetchResult = async () => {
      const { data: usersData } = await axios.get('/api/search', {
        params: {
          searchParams: searchQuery,
        },
      });

      const { data: moviesData } = await tmdb.get('/search/movie', {
        params: { query: searchQuery, page: 1 },
      });

      setData({ ...usersData, movies: moviesData.results });
      setLoading(false);
    };

    if (searchQuery) {
      fetchResult();
    }
  }, [searchQuery]);

  return (
    <div className="flex justify-center p-8">
      <div className="grid w-full max-w-2xl gap-y-6">
        {data.users?.length > 0 && (
          <div
            className="grid justify-items-center gap-y-6 rounded-lg bg-zinc-900 p-4"
            style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
          >
            {data.users?.map((user, index) => (
              <div
                key={index}
                className="grid cursor-pointer items-center justify-items-center gap-x-8 gap-y-2 py-6"
                onClick={() => router.push(`/profile/${user.id}`)}
              >
                <div className="h-20 w-20 overflow-hidden rounded-full object-cover object-center">
                  <img src={user.image} referrerPolicy="no-referrer" />
                </div>
                <div>{user.name}</div>
              </div>
            ))}
          </div>
        )}
        <div className="grid gap-y-3">
          {data.movies?.map((movie, index) => (
            <div
              key={index}
              className="grid h-[219.5px] cursor-pointer grid-rows-1 gap-x-6 overflow-ellipsis rounded-lg
                bg-zinc-900 p-4 transition-transform hover:scale-[102%]"
              style={{ gridTemplateColumns: '125px 1fr' }}
              onClick={() => router.push(`/movies/${movie.id}`)}
            >
              <div className="max-w-full overflow-hidden rounded-lg object-cover object-center">
                <img
                  src={
                    movie.poster_path
                      ? movieImagePath(movie.poster_path)
                      : '/images/poster-placeholder.png'
                  }
                />
              </div>
              <div
                className="grid"
                style={{ gridTemplateRows: 'auto minmax(0, 1fr)' }}
              >
                <div className="mb-2 text-lg font-bold">{movie.title}</div>
                <LinesEllipsis
                  text={movie.overview}
                  maxLine={4}
                  ellipsis="..."
                  basedOn="words"
                  trimRight
                  className="overflow-hidden text-zinc-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Results;
