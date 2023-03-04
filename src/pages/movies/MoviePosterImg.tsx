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
          // minHeight: 300,
          height: {
            xs: 650,
            sm: 650,
            md: 550,
            lg: 550,
            xl: 450,
          },
          overflow: 'hidden',
        }}
      >
        <LazyLoadImage
          src={
            movie?.poster_path
              ? `https://image.tmdb.org/t/p/w400/${movie?.poster_path}`
              : 'https://media.discordapp.net/attachments/1014088216132988928/1016987090208182293/Vector.png?width=456&height=684'
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
            // objectFit: 'contain',
            cursor: 'pointer',
            // width: '100%',
            height: '100%',
          }}
        />
      </Box>
    </>
  );
};

export default MoviePosterImg;
