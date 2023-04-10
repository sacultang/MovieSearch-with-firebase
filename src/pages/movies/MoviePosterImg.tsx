import { IMovieResult } from '../../types/movieType';
import { SimilarType } from '../../types/similarType';
import { HandleClickNaviType } from '../../types/handleClickNaviType';
import DefaultImage from '../../assets/defaultImage.png';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { IMAGE_PATH } from '../../constants/imagePath';
import { useIsImgLoaded } from '../hooks/useIsImageLoad';
interface MoviePosterImgProps {
  movie: IMovieResult | SimilarType;
  handleClickNavigate: HandleClickNaviType;
  scrollcard?: string | undefined;
  cardWidth: number;
  cardBoxRef: React.RefObject<HTMLDivElement>;
}

const MoviePosterImg = ({
  movie,
  handleClickNavigate,
  cardWidth,
  cardBoxRef,
}: MoviePosterImgProps) => {
  const { imgRef, loaded, setLoaded } = useIsImgLoaded(cardBoxRef);
  const handleImageError = () => {
    if (imgRef.current) imgRef.current.src = DefaultImage;
    setLoaded(true);
  };

  return (
    <Box
      sx={{
        height: `${cardWidth && (cardWidth * 3) / 2}px`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {!loaded && <Skeleton variant="rectangular" width="100%" height="100%" />}
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
        onClick={() => handleClickNavigate(movie.id, movie.media_type)}
        onError={handleImageError}
      />
    </Box>
  );
};

export default MoviePosterImg;
