import React, { useState } from 'react';
import { Box } from '@mui/material';
import { IMovieResult } from '../../types/movieType';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CardSkeleton from '../../components/skeleton/CardSkeleton';
import { Similrar } from '../../types/similarType';

interface IProps {
  movie: IMovieResult | Similrar;
  handleNavi: (id: number, type: string) => void;
  detailType: string;
}

const MoviePosterImg = ({ movie, detailType, handleNavi }: IProps) => {
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
          overflow: 'hidden',
        }}
      >
        <LazyLoadImage
          src={
            movie?.poster_path
              ? `https://image.tmdb.org/t/p/w400/${movie?.poster_path}`
              : 'null'
          }
          alt={movie?.original_title || movie?.original_name || 'default Img'}
          onLoad={onLoad}
          onClick={() =>
            handleNavi(
              movie.id,
              movie.media_type ? movie.media_type : detailType
            )
          }
          style={{
            objectFit: 'contain',
            cursor: 'pointer',
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
    </>
  );
};

export default MoviePosterImg;
