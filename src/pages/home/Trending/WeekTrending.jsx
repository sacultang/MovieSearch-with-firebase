import React, { useState, useEffect, useCallback, memo } from 'react';
import { getTrending } from '../../../api/TMDB/Trending/trending';
import CardSkeleton from '../../../components/Skeleton/CardSkeleton';
import { Grid } from '@mui/material';
import MovieCard from '../../movies/MovieCard';
import { useNavigate } from 'react-router-dom';
const WeekTrending = () => {
  const [movieDatas, setMovieDatas] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userFavorite, setUserFavorite] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const navigate = useNavigate();
  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getTrending('week');
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
  const handleClick = (id, type) => {
    navigate(`/details/${id}`, { state: { type, id } });
  };
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
                onClick={handleClick}
              />
            )}
          </Grid>
        ))}
    </Grid>
  );
};

export default memo(WeekTrending);