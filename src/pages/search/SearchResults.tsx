import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid } from '@mui/material';
import Loader from '../../components/common/Loader';
import GridItemProvider from '../../components/common/GridItemProvider';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { HandleClick } from '../../types/Types';
const MovieCard = lazy(() => import('../movies/MovieCard'));
const SearchResults = () => {
  const movieData = useSelector((state: RootState) => state.movie.movie);
  const navigate = useNavigate();

  const handleClick: HandleClick = (id, type) => {
    navigate(`/details/${type}/${id}`, { state: { type, id } });
  };
  return (
    <Container component={'div'} sx={{ flexGrow: 1, p: 0 }}>
      <Grid container spacing={2} mt={0}>
        {movieData.results &&
          movieData.results.map((movie) => (
            <GridItemProvider key={movie.id}>
              <Suspense fallback={<Loader />}>
                <MovieCard movie={movie} handleClick={handleClick} />
              </Suspense>
            </GridItemProvider>
          ))}
      </Grid>
    </Container>
  );
};

export default SearchResults;
