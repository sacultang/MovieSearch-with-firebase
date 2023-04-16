import { memo } from 'react';
import MovieCard from '../../movies/MovieCard';
import { IMovieResult } from '../../../types/movieType';

import PageGridItem from '../../../components/pageGrid/PageGridItem';
import ScrollGridContainer from '../../../components/scrollGrid/ScrollGridContainer';
import useHandleNavigate from '../../hooks/useHandleNavigate';

interface TrendingScollProp {
  trendingDatas: IMovieResult[];
}
const TrendingScroll = ({ trendingDatas }: TrendingScollProp) => {
  const handleClickNavigate = useHandleNavigate();

  return (
    <ScrollGridContainer>
      {trendingDatas &&
        trendingDatas.map((movie) => (
          <PageGridItem key={movie.id} scrollcard="true">
            <MovieCard
              movie={movie}
              handleClickNavigate={handleClickNavigate}
              scrollcard="true"
            />
          </PageGridItem>
        ))}
    </ScrollGridContainer>
  );
};

export default memo(TrendingScroll);
