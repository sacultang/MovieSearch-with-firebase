import React, { useState, useEffect, useCallback, memo } from 'react';
import MovieCard from '../../movies/MovieCard';
import { IMovie } from '../../../types/movieType';
import { requestData } from '../../../api/TMDB/request';
import { METHOD_CONS } from '../../../constants/fetchMethod';
import GridItemProvider from '../../../components/common/GridItemProvider';
import ScrollGridContainer from '../components/ScrollGridContainer';
import useHandleNavigate from '../../hooks/useHandleNavigate';

const WeekTrendingScroll = () => {
  const [movieDatas, setMovieDatas] = useState<IMovie>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });

  const trendingWeekFetch = useCallback(async () => {
    const res = await requestData(`trending/all/week`, METHOD_CONS.get);
    setMovieDatas(res.data);
  }, []);

  useEffect(() => {
    trendingWeekFetch();
  }, [trendingWeekFetch]);

  const handleClick = useHandleNavigate();

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

export default memo(WeekTrendingScroll);
