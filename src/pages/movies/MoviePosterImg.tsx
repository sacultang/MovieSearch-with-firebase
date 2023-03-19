import React, { useState } from 'react';
import { IMovieResult } from '../../types/movieType';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CardSkeleton from '../../components/skeleton/CardSkeleton';
import { Similrar } from '../../types/similarType';
import { HandleClickNaviType } from '../../types/handleClickNaviType';
import Box from '@mui/material/Box';
interface IProps {
  movie: IMovieResult | Similrar;
  handleClick: HandleClickNaviType;
  scrollcard?: string | undefined;
  cardWidth: number | null;
}

const MoviePosterImg = ({ movie, handleClick, cardWidth }: IProps) => {
  const [imgLoading, setImgLoading] = useState(false);
  function onLoad() {
    setImgLoading(true);
  }

  return (
    <Box
      sx={{
        height: `${cardWidth && (cardWidth * 3) / 2}px`,
        overflow: 'hidden',
      }}
    >
      {!imgLoading && <CardSkeleton cardWidth={cardWidth} />}
      <LazyLoadImage
        src={
          movie?.poster_path
            ? `https://image.tmdb.org/t/p/w400/${movie?.poster_path}`
            : 'https://media.discordapp.net/attachments/1014088216132988928/1016987090208182293/Vector.png?width=456&height=684'
        }
        alt={movie?.original_title || movie?.original_name || 'default Img'}
        onLoad={onLoad}
        onClick={() => handleClick(movie.id, movie.media_type)}
        style={{
          cursor: 'pointer',
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};

export default MoviePosterImg;
