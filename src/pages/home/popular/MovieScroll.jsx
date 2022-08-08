import React, { useState, useEffect, useCallback, memo } from 'react';
import { requestHome } from '../../../api/TMDB/baseUrl';

import CardSkeleton from '../../../components/Skeleton/CardSkeleton';
import { Grid } from '@mui/material';
import MovieCard from '../../movies/MovieCard';
const MovieScroll = () => {
  const [movieDatas, setMovieDatas] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userFavorite, setUserFavorite] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await requestHome('movie/popular');
      setMovieDatas(res);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetch();
    return () => {
      fetch();
    };
  }, []);

  return (
    <Grid
      container
      spacing={2}
      style={{ minHeight: '330px' }}
      direction="row"
      flexWrap="nowrap"
    >
      {movieDatas.results &&
        movieDatas.results.map((movie) => (
          <Grid item key={movie.id} xs={3} sx={{ minWidth: 200 }}>
            {isLoading ? (
              <CardSkeleton />
            ) : (
              <MovieCard
                userFavorite={userFavorite}
                movie={movie}
                setUserFavorite={setUserFavorite}
                setFavoriteList={setFavoriteList}
                favoriteList={favoriteList}
              />
            )}
          </Grid>
        ))}
    </Grid>
  );
};

export default memo(MovieScroll);
