import React, { useState, useEffect, useCallback, memo } from 'react';
import MovieCard from '../../movies/MovieCard';

import { useNavigate } from 'react-router-dom';
import { requestData } from '../../../api/TMDB/baseUrl';
import { IMovie } from '../../../types/movieType';
import { METHOD_CONS } from '../../../constants/fetchMethod';
import { HandleClickNaviType } from '../../../types/handleClickNaviType';
import GridItemProvider from '../../../components/common/GridItemProvider';
import ScrollGridContainer from '../../../components/scrollGrid/ScrollGridContainer';
const TodayTrendingScroll = () => {
  const [movieDatas, setMovieDatas] = useState<IMovie>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });

  const navigate = useNavigate();
  const fetch = useCallback(async () => {
    const url = `trending/all/day`;
    const res = await requestData(url, METHOD_CONS.get);
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

export default memo(TodayTrendingScroll);
