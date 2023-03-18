import React, { useState, useEffect, useCallback, memo } from 'react';

import MovieCard from '../../movies/MovieCard';
import { useNavigate } from 'react-router-dom';
import { IMovie } from '../../../types/movieType';
import { requestData } from '../../../api/TMDB/baseUrl';
import { METHOD_CONS } from '../../../api/TMDB/constant';
import { HandleClickNaviType } from '../../../types/Types';
import GridItemProvider from '../../../components/common/GridItemProvider';
import ScrollGridContainer from '../../../components/scrollGrid/ScrollGridContainer';
const WeekTrendingScroll = () => {
  const [movieDatas, setMovieDatas] = useState<IMovie>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });

  const navigate = useNavigate();
  const fetch = useCallback(async () => {
    const res = await requestData(`trending/all/week`, METHOD_CONS.get);

    setMovieDatas(res.data);
  }, []);
  useEffect(() => {
    fetch();
  }, [fetch]);
  const handleClick: HandleClickNaviType = (id, type) => {
    navigate(`/details/${type}/${id}`, { state: { type, id } });
  };
  return (
    <ScrollGridContainer>
      {movieDatas.results &&
        movieDatas.results.map((movie) => (
          <GridItemProvider key={movie.id}>
            <MovieCard movie={movie} handleClick={handleClick} scrollCard />
          </GridItemProvider>
        ))}
    </ScrollGridContainer>
  );
};

export default memo(WeekTrendingScroll);
