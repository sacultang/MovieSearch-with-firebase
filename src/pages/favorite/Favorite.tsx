import { useLocation, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PageTitle from '../../components/common/PageTitle';
import PageGridItem from '../../components/pageGrid/PageGridItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useHandleNavigate from '../hooks/useHandleNavigate';
import MovieCard from '../movies/MovieCard';

const Favorite = () => {
  const location = useLocation();
  const params = useParams();
  const movieDatas = useSelector(
    (state: RootState) => state.favorite.favoriteMovie
  );
  const handleClickNavigate = useHandleNavigate();
  return (
    <Container sx={{ flexGrow: 1, minHeight: 800 }}>
      <PageTitle url={location.pathname} params={params} />
      <Grid container>
        {movieDatas.length > 0 &&
          movieDatas.map((movie) => (
            <PageGridItem key={movie.id}>
              <MovieCard
                movie={movie.movie}
                handleClickNavigate={handleClickNavigate}
              />
            </PageGridItem>
          ))}
      </Grid>
    </Container>
  );
};

export default Favorite;
