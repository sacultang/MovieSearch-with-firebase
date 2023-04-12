import { useLocation, useParams } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';
import PageGridItem from '../../components/pageGrid/PageGridItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useHandleNavigate from '../hooks/useHandleNavigate';
import MovieCard from '../movies/MovieCard';
import PageGridContainer from '../../components/pageGrid/PageGridContainer';
import PageContainer from '../../components/pageGrid/PageContainer';
const Favorite = () => {
  const location = useLocation();
  const params = useParams();
  const movieDatas = useSelector(
    (state: RootState) => state.favorite.favoriteMovie
  );
  const handleClickNavigate = useHandleNavigate();
  return (
    <PageContainer minHeight={700}>
      <PageTitle url={location.pathname} params={params} />
      <PageGridContainer>
        {movieDatas.length > 0 &&
          movieDatas.map((movie) => (
            <PageGridItem key={movie.id}>
              <MovieCard
                movie={movie.movie}
                handleClickNavigate={handleClickNavigate}
              />
            </PageGridItem>
          ))}
      </PageGridContainer>
    </PageContainer>
  );
};

export default Favorite;
