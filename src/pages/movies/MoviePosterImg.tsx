import React, { useState } from 'react';
import { Box } from '@mui/material';
import { IMovieResult } from '../../types/movieType';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CardSkeleton from '../../components/Skeleton/CardSkeleton';
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
      {!imgLoading && <CardSkeleton />}
      <Box
        sx={{
          borderRadius: '10px',
          minHeight: 248.99,
          maxWidth: '100%',
          // maxHeight: 249,
          overflow: 'hidden',
        }}
      >
        <LazyLoadImage
          src={`https://image.tmdb.org/t/p/w400/${movie?.poster_path}`}
          alt={movie?.original_title || movie?.original_name}
          onLoad={onLoad}
          width={'100%'}
          style={{
            objectFit: 'contain',
            cursor: 'pointer',
          }}
        />
      </Box>
    </>
  );
};

export default MoviePosterImg;
