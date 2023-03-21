import React from 'react';
import { IMovieResult } from '../../types/movieType';
import CardSkeleton from '../../components/skeleton/CardSkeleton';
import { Similrar } from '../../types/similarType';
import { HandleClickNaviType } from '../../types/handleClickNaviType';
import DefaultImage from '../../assets/defaultImage.png';
import Box from '@mui/material/Box';
import { IMAGE_PATH } from '../../constants/imagePath';
import { useIsImgLoaded } from './hooks/useIsImageLoad';
interface MoviePosterImgProps {
  movie: IMovieResult | Similrar;
  handleClick: HandleClickNaviType;
  scrollcard?: string | undefined;
  cardWidth: number;
}

const MoviePosterImg = ({
  movie,
  handleClick,
  cardWidth,
}: MoviePosterImgProps) => {
  const { imgRef, loaded } = useIsImgLoaded();

  return (
    <Box
      sx={{
        height: `${cardWidth && (cardWidth * 3) / 2}px`,
        overflow: 'hidden',
      }}
    >
      {!loaded && <CardSkeleton cardWidth={cardWidth} />}
      <img
        src={
          movie?.poster_path
            ? `${IMAGE_PATH.w400}/${movie?.poster_path}`
            : DefaultImage
        }
        alt={movie?.original_title || movie?.original_name || 'default Img'}
        ref={imgRef}
        style={{
          cursor: 'pointer',
          width: '100%',
          height: '100%',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
        onClick={() => handleClick(movie.id, movie.media_type)}
      />
    </Box>
  );
};

export default MoviePosterImg;
