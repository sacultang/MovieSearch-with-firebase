import React, { memo } from 'react';
import MovieCard from '../../movies/MovieCard';
import { IMovieResult } from '../../../types/movieType';

import GridItemProvider from '../../../components/common/GridItemProvider';
import ScrollGridContainer from '../components/ScrollGridContainer';
import useHandleNavigate from '../../hooks/useHandleNavigate';
interface ScrollComponentProp {
  movieDatas: IMovieResult[];
}
const ScrollComponent = ({ movieDatas }: ScrollComponentProp) => {
  const handleClick = useHandleNavigate();

  return (
    <ScrollGridContainer>
      {movieDatas &&
        movieDatas.map((movie) => (
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

export default memo(ScrollComponent);