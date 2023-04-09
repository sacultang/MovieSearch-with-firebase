import React, { lazy, Suspense } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PageTitle from '../../components/common/PageTitle';
import Loader from '../../components/common/Loader';
import GridItemProvider from '../../components/common/GridItemProvider';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useHandleNavigate from '../hooks/useHandleNavigate';
const MovieCard = lazy(() => import('../movies/MovieCard'));

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
            <GridItemProvider key={movie.id}>
              <Suspense fallback={<Loader />}>
                <MovieCard
                  movie={movie.movie}
                  handleClickNavigate={handleClickNavigate}
                />
              </Suspense>
            </GridItemProvider>
          ))}
      </Grid>
    </Container>
  );
};

export default Favorite;
