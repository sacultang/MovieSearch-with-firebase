import React, { useState, useEffect, useCallback, memo } from 'react';
import { getTrending } from '../../../api/TMDB/Trending/trending';
import { Grid } from '@mui/material';
import MovieCard from '../../movies/MovieCard';
import { useNavigate } from 'react-router-dom';
import { IMovie } from '../../../types/movieType';
const WeekTrending = () => {
  const [movieDatas, setMovieDatas] = useState<IMovie>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });

  const navigate = useNavigate();
  const fetch = useCallback(async () => {
    try {
      const res = await getTrending('week');
      setMovieDatas(res);
    } catch (e) {
      console.log(e);
    } finally {
    }
  }, []);
  useEffect(() => {
    fetch();
  }, [fetch]);
  const handleClick = (id: string, type: string) => {
    navigate(`/details/${type}/${id}`, { state: { type, id } });
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
            <MovieCard movie={movie} handleClick={handleClick} />
          </Grid>
        ))}
    </Grid>
  );
};

export default memo(WeekTrending);
