import React, { useEffect, useState, useCallback } from 'react';
import MovieCard from './MovieCard';
import { getMovieData } from '../../api/TMDB/Movies/getMovieAPI';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
const MoviePage = () => {
  const params = useParams();
  const [movieDatas, setMovieDatas] = useState({});

  const fetch = useCallback(async () => {
    const res = await getMovieData(params.query);
    setMovieDatas(res);
  }, [params]);
  useEffect(() => {
    fetch();
  }, [params]);
  return (
    <Container className="inner-container">
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {movieDatas.results &&
          movieDatas.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </Box>
    </Container>
  );
};

export default MoviePage;
