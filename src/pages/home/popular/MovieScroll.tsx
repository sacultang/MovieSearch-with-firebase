import React, { useState, useEffect, useCallback, memo } from 'react';
import { requestData } from '../../../api/TMDB/baseUrl';
import { useNavigate } from 'react-router-dom';

import MovieCard from '../../movies/MovieCard';
import { IMovie } from '../../../types/movieType';
import { METHOD_CONS } from '../../../constants/fetchMethod';
import { HandleClickNaviType } from '../../../types/handleClickNaviType';
import GridItemProvider from '../../../components/common/GridItemProvider';
import ScrollGridContainer from '../components/ScrollGridContainer';
const MovieScroll = () => {
  const [movieDatas, setMovieDatas] = useState<IMovie>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });

  const navigate = useNavigate();
  const popularMovieFetch = useCallback(async () => {
    const res = await requestData('movie/popular', METHOD_CONS.get);
    setMovieDatas(res.data);
  }, []);
  useEffect(() => {
    popularMovieFetch();
  }, [popularMovieFetch]);
  const handleClick: HandleClickNaviType = (id, type) => {
    navigate(`/details/movie/${id}`, { state: { type: 'movie', id } });
  };
  return (
    <ScrollGridContainer>
      {movieDatas.results &&
        movieDatas.results.map((movie) => (
          <GridItemProvider key={movie.id}>
            <MovieCard
              movie={movie}
              handleClick={handleClick}
              scrollcard="true"
            />
          </GridItemProvider>
        ))}
    </ScrollGridContainer>
  );
};

export default memo(MovieScroll);
