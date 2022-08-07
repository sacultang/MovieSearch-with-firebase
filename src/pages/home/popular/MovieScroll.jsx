import React, { useState, useEffect, useCallback, memo } from 'react';
import { requestHome } from '../../../api/TMDB/baseUrl';
import MovieCard from '../../movies/MovieCard';
import CardSkeleton from '../../../components/Skeleton/CardSkeleton';
import { List, ListItem } from '@mui/material';
const MovieScroll = () => {
  const [movieDatas, setMovieDatas] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userFavorite, setUserFavorite] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  };
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
    <List style={{ ...flexContainer, minHeight: '330px' }}>
      {movieDatas.results &&
        movieDatas.results.map((movie) => (
          <ListItem key={movie.id}>
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
          </ListItem>
        ))}
    </List>
  );
};

export default memo(MovieScroll);