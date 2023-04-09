import React from 'react';
import { IMovieResult } from '../../types/movieType';
import { SimilarType } from '../../types/similarType';
import { HandleClickNaviType } from '../../types/handleClickNaviType';
import DefaultImage from '../../assets/defaultImage.png';
import Box from '@mui/material/Box';
import { IMAGE_PATH } from '../../constants/imagePath';
import { useIsImgLoaded } from '../hooks/useIsImageLoad';

interface MoviePosterImgProps {
  movie: IMovieResult | SimilarType;
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
  const handleImageError = () => {
    if (imgRef.current) imgRef.current.src = DefaultImage;
  };
  return (
    <Box
      sx={{
        height: `${cardWidth && (cardWidth * 3) / 2}px`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <img
        src={`${cardWidth > 200 ? IMAGE_PATH.w400 : IMAGE_PATH.w200}/${
          movie?.poster_path
        }`}
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
        onError={handleImageError}
      />
    </Box>
  );
};

export default MoviePosterImg;
