import React, { useState } from 'react';
import { Box } from '@mui/material';
import { IMovieResult } from '../../types/movieType';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CardSkeleton from '../../components/Skeleton/CardSkeleton';
import { Root2 } from '../../types/similarType';

interface IProps {
  movie: IMovieResult | Root2;
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
          // maxHeight: 249,
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
