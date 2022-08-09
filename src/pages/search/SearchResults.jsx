import React, { useState, lazy, Suspense, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid } from '@mui/material';
import Loader from '../../components/Common/Loader';
import { useNavigate } from 'react-router-dom';
const MovieCard = lazy(() => import('../movies/MovieCard'));
const SearchResults = () => {
  const [userFavorite, setUserFavorite] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const movieData = useSelector((state) => state.movie.movie);
  const navigate = useNavigate();
  const handleNavigate = useCallback(
    (type, id) => {
      navigate(`/details/${id}`, { state: { type, id } });
    },
    [navigate]
  );
  return (
    <Container sx={{ flexGrow: 1 }} p={0}>
      <Grid container spacing={2} mt={0}>
        {movieData.results &&
          movieData.results.map((movie) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              xl={3}
              key={movie.id}
              onClick={() => {
                handleNavigate(movie.media_type, movie.id);
              }}
            >
              <Suspense fallback={<Loader />}>
                <MovieCard
                  userFavorite={userFavorite}
                  movie={movie}
                  setUserFavorite={setUserFavorite}
                  setFavoriteList={setFavoriteList}
                  favoriteList={favoriteList}
                />
              </Suspense>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default SearchResults;
