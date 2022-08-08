import React, { useCallback, useEffect, useState } from 'react';
import { getSearchData } from '../api/TMDB/Popular/getPopularAPI';
import MovieDetailCard from './movies/MovieDetailCard';

const Search = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(9);
  const [numPages, setNumPages] = useState([]);
  const [movieDatas, setMovieDatas] = useState([]);

  const fetch = useCallback(
    async (search) => {
      const res = await getSearchData(search, page);
      console.log(res);
      setMovieDatas(res.results);
      setNumPages(Array.from({ length: res.total_pages }, (v, i) => i + 1));
    },
    [page]
  );

  const getMovieList = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const search = data.get('search');
    setSearch(search);
  };

  useEffect(() => {
    if (search !== '') {
      fetch(search);
    }
  }, [page, search]);

  return (
    <>
      <form onSubmit={getMovieList}>
        <div>Search</div>
        <input type="text" name="search" />
        <button>search</button>
      </form>
      {/* {movieDatas &&
        movieDatas.map((item, idx) => {
          return (
            <div key={item.id}>
              <MovieDetailCard
                title={item.title}
                image={item.poster_path}
                overview={item.overview}
                date={item.release_date}
              />
            </div>
          );
        })}
      {numPages.length > 0 ? (
        <>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            &lt;
          </button>
          {numPages.map((item) => {
            return (
              <button onClick={() => setPage(item)} disabled={page === item}>
                {item}
              </button>
            );
          })}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === numPages.length}
          >
            &gt;
          </button>
        </>
      ) : null} */}
    </>
  );
};

export default Search;
