import { memo } from 'react';
import MovieCard from '../../movies/MovieCard';
import { IMovieResult } from '../../../types/movieType';

import GridItemProvider from '../../../components/common/GridItemProvider';
import ScrollGridContainer from '../components/ScrollGridContainer';
import useHandleNavigate from '../../hooks/useHandleNavigate';
interface PopularScrollProp {
  movieAndTvDatas: IMovieResult[];
}
const PopularScroll = ({ movieAndTvDatas }: PopularScrollProp) => {
  const handleClickNavigate = useHandleNavigate();

  return (
    <ScrollGridContainer>
      {movieAndTvDatas &&
        movieAndTvDatas.map((movie) => (
          <GridItemProvider key={movie.id}>
            <MovieCard
              movie={movie}
              handleClickNavigate={handleClickNavigate}
              scrollcard="true"
            />
          </GridItemProvider>
        ))}
    </ScrollGridContainer>
  );
};

export default memo(PopularScroll);
