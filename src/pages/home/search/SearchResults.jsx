import React, { useState, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

import { Container, Grid } from '@mui/material';
import Loader from '../../../components/Common/Loader';
const MovieCard = lazy(() => import('../../movies/MovieCard'));
const SearchResults = () => {
  const [userFavorite, setUserFavorite] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const movieData = useSelector((state) => state.movie.movie);

  return (
    <Container sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {movieData.results &&
          movieData.results.map((movie) => (
            <Grid item xs={12} sm={8} md={4} lg={2} key={movie.id}>
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
