import React, { useState, useEffect, useCallback, memo } from 'react';
import { requestData } from '../../../api/TMDB/baseUrl';
import { useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';
import MovieCard from '../../movies/MovieCard';
import { IMovie } from '../../../types/movieType';
import { METHOD_CONS } from '../../../api/TMDB/constant';
import { HandleClickNaviType } from '../../../types/Types';
const MovieScroll = () => {
  const [movieDatas, setMovieDatas] = useState<IMovie>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });

  const navigate = useNavigate();
  const fetch = useCallback(async () => {
    const res = await requestData('movie/popular', METHOD_CONS.get);
    setMovieDatas(res.data);
  }, []);
  useEffect(() => {
    fetch();
  }, [fetch]);
  const handleClick: HandleClickNaviType = (id, type) => {
    navigate(`/details/movie/${id}`, { state: { type: 'movie', id } });
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

export default memo(MovieScroll);
