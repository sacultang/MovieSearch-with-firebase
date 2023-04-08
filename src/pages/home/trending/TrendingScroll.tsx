import React, { memo } from 'react';
import MovieCard from '../../movies/MovieCard';
import { IMovieResult } from '../../../types/movieType';

import GridItemProvider from '../../../components/common/GridItemProvider';
import ScrollGridContainer from '../components/ScrollGridContainer';
import useHandleNavigate from '../../hooks/useHandleNavigate';

interface TrendingScollProp {
  trendingDatas: IMovieResult[];
}
const TrendingScroll = ({ trendingDatas }: TrendingScollProp) => {
  const handleClick = useHandleNavigate();

  return (
    <ScrollGridContainer>
      {trendingDatas &&
        trendingDatas.map((movie) => (
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

export default memo(TrendingScroll);
