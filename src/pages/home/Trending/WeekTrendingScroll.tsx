import React, { useState, useEffect, useCallback, memo } from 'react';
import { Grid } from '@mui/material';
import MovieCard from '../../movies/MovieCard';
import { useNavigate } from 'react-router-dom';
import { IMovie } from '../../../types/movieType';
import { requestData } from '../../../api/TMDB/baseUrl';
import { METHOD_CONS } from '../../../api/TMDB/constant';
import { HandleClickNaviType } from '../../../types/Types';
import GridItemProvider from '../../../components/common/GridItemProvider';
const WeekTrendingScroll = () => {
  const [movieDatas, setMovieDatas] = useState<IMovie>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });

  const navigate = useNavigate();
  const fetch = useCallback(async () => {
    const res = await requestData(`trending/all/week`, METHOD_CONS.get);

    setMovieDatas(res.data);
  }, []);
  useEffect(() => {
    fetch();
  }, [fetch]);
  const handleClick: HandleClickNaviType = (id, type) => {
    navigate(`/details/${type}/${id}`, { state: { type, id } });
  };
  return (
    <Grid container direction="row" flexWrap="nowrap">
      {movieDatas.results &&
        movieDatas.results.map((movie) => (
          <GridItemProvider key={movie.id}>
            <MovieCard movie={movie} handleClick={handleClick} />
          </GridItemProvider>
        ))}
    </Grid>
  );
};

export default memo(WeekTrendingScroll);
