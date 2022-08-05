import React, { useEffect, useState, useCallback } from 'react';
import MovieCard from './MovieCard';
import CardSkeleton from '../../components/Skeleton/CardSkeleton';
import { getMovieData } from '../../api/TMDB/Movies/getMovieAPI';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const MoviePage = () => {
  const params = useParams();
  const [movieDatas, setMovieDatas] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getMovieData(params.query);
      setMovieDatas(res);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [params]);
  useEffect(() => {
    console.log(isLoading);
    fetch();
    return () => {
      fetch();
    };
  }, [params]);
  return (
    <Container className="inner-container">
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          margin: '0 auto',
        }}
      >
        {movieDatas.results &&
          movieDatas.results.map((movie) => (
            <div key={movie.id}>
              {isLoading ? <CardSkeleton /> : <MovieCard movie={movie} />}
            </div>
          ))}
      </Box>
    </Container>
  );
};

export default MoviePage;
