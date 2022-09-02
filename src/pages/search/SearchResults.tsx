import React, { lazy, Suspense, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid } from '@mui/material';
import Loader from '../../components/common/Loader';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
const MovieCard = lazy(() => import('../movies/MovieCard'));
const SearchResults = () => {
  const movieData = useSelector((state: RootState) => state.movie.movie);
  const navigate = useNavigate();
  const handleNavigate = useCallback(
    (e: MouseEvent, type: string, id: string | number) => {
      navigate(`/details/${type}/${id}`, { state: { type, id } });
    },
    [navigate]
  );
  return (
    <Container component={'div'} sx={{ flexGrow: 1, p: 0 }}>
      <Grid container spacing={2} mt={0}>
        {movieData.results &&
          movieData.results.map((movie) => (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={movie.id}>
              <Suspense fallback={<Loader />}>
                <MovieCard
                  movie={movie}
                  handleClick={(e: MouseEvent) => {
                    handleNavigate(e, movie.media_type, movie.id);
                  }}
                />
              </Suspense>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default SearchResults;
