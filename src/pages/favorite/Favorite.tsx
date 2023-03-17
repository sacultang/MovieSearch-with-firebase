import React, { lazy, Suspense } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PageTitle from '../../components/common/PageTitle';
import Loader from '../../components/common/Loader';
import GridItemProvider from '../../components/common/GridItemProvider';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IMovieResult } from '../../types/movieType';
const MovieCard = lazy(() => import('../movies/MovieCard'));

interface IFBMovieType {
  id: string;
  movie: IMovieResult;
}

const Favorite = () => {
  const location = useLocation();
  const params = useParams();

  const movieDatas = useSelector((state: RootState) => state.favorite.favorite);

  const handleClick = (id: string, type: string) => {
    if (type === 'favorite') return;
  };
  return (
    <Container sx={{ flexGrow: 1, minHeight: 800 }}>
      <PageTitle url={location.pathname} params={params} />
      <Grid container spacing={2}>
        {movieDatas.length > 0 &&
          movieDatas.map((movie: IFBMovieType) => (
            <GridItemProvider key={movie.id}>
              <Suspense fallback={<Loader />}>
                <MovieCard movie={movie.movie} handleClick={handleClick} />
              </Suspense>
            </GridItemProvider>
          ))}
      </Grid>
    </Container>
  );
};

export default Favorite;
