import React, { lazy, Suspense } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PageTitle from '../../components/common/PageTitle';
import Loader from '../../components/common/Loader';
import GridItemProvider from '../../components/common/GridItemProvider';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { HandleClickNaviType } from '../../types/Types';
const MovieCard = lazy(() => import('../movies/MovieCard'));

const Favorite = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const movieDatas = useSelector(
    (state: RootState) => state.favorite.favoriteMovie
  );
  const handleClick: HandleClickNaviType = (id, type) => {
    navigate(`/details/${type}/${id}`, { state: { type, id } });
  };
  return (
    <Container sx={{ flexGrow: 1, minHeight: 800 }}>
      <PageTitle url={location.pathname} params={params} />
      <Grid container spacing={2}>
        {movieDatas.length > 0 &&
          movieDatas.map((movie) => (
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
