import { memo } from 'react';

// mui
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import ListIcon from '@mui/icons-material/List';

// component
import MoviePosterImg from './MoviePosterImg';
import { IMovieResult } from '../../types/movieType';
import { Similrar } from '../../types/similarType';
import { HandleClickNaviType } from '../../types/Types';
import useFavorite from './hooks/useFavorite';
import useGetCardWidth from './hooks/useGetCardWidth';
interface IProps {
  movie: IMovieResult | Similrar;
  handleClick: HandleClickNaviType;
  scrollcard?: string;
}

const MovieCard = ({ movie, handleClick, scrollcard }: IProps) => {
  const {
    handleFavorite,
    user,
    isFavoriteChecked,
    handleOpenAddList,
    anchorEl,
    handleOpenMenu,
    handleCloseMenu,
  } = useFavorite(movie);
  const open = Boolean(anchorEl);
  const { cardBoxRef, cardWidth } = useGetCardWidth();

  return (
    <CardItem scrollcard={scrollcard} ref={cardBoxRef}>
      {/* IMG */}

      <MoviePosterImg
        movie={movie}
        handleClick={handleClick}
        scrollcard={scrollcard}
        cardWidth={cardWidth}
      />

      {/* 좋아요 버튼 */}
      <Box
        sx={{
          position: 'absolute',
          top: 5,
          right: 5,
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
          }}
          onClick={(e) => handleFavorite(e, movie)}
        >
          {isFavoriteChecked && user.uid ? (
            <FavoriteIcon
              id="likeBtn"
              sx={{ color: '#ff5d5d', width: '1rem', height: '1rem' }}
            />
          ) : (
            <FavoriteBorder
              id="likeBtn"
              sx={{ width: '1rem', height: '1rem' }}
            />
          )}
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
          }}
          onClick={handleOpenMenu}
        >
          <MoreVertIcon id="listBtn" sx={{ width: '1rem', height: '1rem' }} />
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
              color: 'var(--yellow-text-color)',
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
        onClick={() => handleClick(movie.id, movie.media_type)}
      >
        {movie?.original_title
          ? movie?.original_title.length > 15
            ? movie?.original_title.slice(0, 17) + ' ...'
            : movie?.original_title
          : movie?.original_name}
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
