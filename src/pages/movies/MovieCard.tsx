import { useMemo, memo, useRef } from 'react';
// mui
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListIcon from '@mui/icons-material/List';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// component
import { IMovieResult } from '../../types/movieType';
import { SimilarType } from '../../types/similarType';
import { HandleClickNaviType } from '../../types/handleClickNaviType';
import useFavorite from './hooks/useFavorite';
import MoviePosterImg from './MoviePosterImg';
import sliceTextLength from '../../utils/sliceText';
import useGetCardWidth from './hooks/useGetCardWidth';

interface MovieCardProps {
  movie: IMovieResult | SimilarType;
  handleClickNavigate: HandleClickNaviType;
  scrollcard?: string;
}

const MovieCard = ({
  movie,
  handleClickNavigate,
  scrollcard,
}: MovieCardProps) => {
  const {
    handleFavorite,
    isFavoriteChecked,
    handleOpenAddList,
    anchorEl,
    handleOpenMenu,
    handleCloseMenu,
  } = useFavorite(movie);
  const open = Boolean(anchorEl);
  const cardItemRef = useRef<HTMLDivElement>(null);
  const { cardWidth } = useGetCardWidth(cardItemRef);
  const sliceTitle = useMemo(() => {
    return sliceTextLength(movie.original_title || movie.original_name);
  }, [movie.original_title, movie.original_name]);

  const useFavoriteIcon = isFavoriteChecked ? (
    <FavoriteIcon
      id="likeBtn"
      sx={{ color: '#ff5d5d', width: '15px', height: '15px' }}
    />
  ) : (
    <FavoriteBorder id="likeBtn" sx={{ width: '15px', height: '15px' }} />
  );

  return (
    <CardItem scrollcard={scrollcard} ref={cardItemRef}>
      <MoviePosterImg
        movie={movie}
        handleClickNavigate={handleClickNavigate}
        scrollcard={scrollcard}
        cardWidth={cardWidth}
      />
      {/* 좋아요 버튼 */}
      <Box
        sx={{
          position: 'absolute',
          top: 5,
          right: 5,
          width: 32,
          height: 70,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <IconButton
          aria-label="favorite"
          sx={{
            backgroundColor: 'rgba(221,221,221,0.57)',
            borderRadius: '50%',
            width: 32,
            height: 32,
          }}
          onClick={(e) => handleFavorite(e, movie)}
        >
          {useFavoriteIcon}
        </IconButton>

        {/* 리스트 만들기 버튼 */}
        <IconButton
          aria-label="settings"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{
            backgroundColor: 'rgba(221,221,221,0.57)',
            borderRadius: '50%',
            width: 32,
            height: 32,
          }}
          onClick={handleOpenMenu}
        >
          <MoreVertIcon id="listBtn" sx={{ width: '15px', height: '15px' }} />
        </IconButton>
        <Menu
          id="list-positioned-menu"
          aria-labelledby="list-positioned-button"
          open={open}
          onClose={handleCloseMenu}
          anchorEl={anchorEl}
        >
          <MenuItem onClick={handleOpenAddList}>
            <ListIcon sx={{ width: '1rem' }} />
            <Typography
              gutterBottom
              variant="body1"
              sx={{ fontSize: '0.8rem', mb: 0 }}
            >
              &nbsp;목록에 추가
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pt: 1,
          pr: 1,
          pl: 1,
        }}
      >
        <Typography
          gutterBottom
          variant="body1"
          sx={{ fontSize: '0.8rem', mr: 1, mb: 0 }}
        >
          {movie?.release_date || movie?.first_air_date}
        </Typography>
        <Typography
          gutterBottom
          variant="body1"
          sx={{
            fontSize: '0.8rem',
            fontWeight: 600,
            mb: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <StarIcon
            sx={{
              width: '1rem',
              height: '1rem',
              color: 'secondary.main',
              mb: 0,
            }}
          />
          {movie?.vote_average}
        </Typography>
      </Box>
      <Typography
        gutterBottom
        variant="h2"
        component="h2"
        sx={{
          fontSize: '1rem',
          fontWeight: 700,
          pt: 1,
          pb: 1,
          pr: 1,
          pl: 1,
          cursor: 'pointer',
        }}
        onClick={() => handleClickNavigate(movie.id, movie.media_type)}
      >
        {sliceTitle}
      </Typography>
    </CardItem>
  );
};

export default memo(MovieCard);

const CardItem = styled(Card)<{ scrollcard: string | undefined }>`
  margin: 5px;
  position: relative;
  width: ${({ scrollcard }) => scrollcard && '200px'};
  &:hover {
    h2 {
      color: var(--yellow-text-color);
    }
  }
`;
