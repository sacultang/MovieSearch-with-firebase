import React, { useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
import { Stack, CircularProgress, Box } from '@mui/material';
import styled from '@emotion/styled';
import { IMovieResult } from '../../types/movieType';

interface IProps {
  movie: IMovieResult;
}

const MoviePosterImg = ({ movie }: IProps) => {
  const [imgLoading, setImgLoading] = useState(false);
  function onLoad() {
    setImgLoading(true);
  }
  return (
    <>
      {!imgLoading && (
        <Stack
          alignItems="center"
          justifyContent="center"
          height={250}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          <CircularProgress color="secondary" size={30} />
        </Stack>
      )}
      <Box
        sx={{
          borderRadius: '10px',
          minHeight: 248.99,
          maxWidth: '100%',
          // maxHeight: 249,
          overflow: 'hidden',
        }}
      >
        <CardImg
          src={`https://image.tmdb.org/t/p/w300/${movie?.poster_path}`}
          alt={movie?.original_title || movie?.original_name}
          onLoad={onLoad}
        />
      </Box>
    </>
  );
};

export default MoviePosterImg;
const CardImg = styled.img`
  object-fit: contain;
  width: 100%;
  /* height: 249px; */
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.03);
  }
`;
