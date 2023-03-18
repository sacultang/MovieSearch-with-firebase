import { useState, useCallback, useEffect, memo, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setToastAction } from '../../store/toastSlice';
import { checkFavoriteMovieId } from '../../utils/checkFavoriteMovieId';
import {
  setListModalAction,
  setLoginAlertAction,
} from '../../store/toastSlice';

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
// firebase
import '../../firebase';
import { doc, collection, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

// component
import MoviePosterImg from './MoviePosterImg';
import { IMovieResult } from '../../types/movieType';
import { RootState } from '../../store/store';
import { Similrar } from '../../types/similarType';
import { HandleClickNaviType } from '../../types/Types';
import { setListMovieAction } from '../../store/listMovieSlice';

interface IProps {
  movie: IMovieResult | Similrar;
  handleClick: HandleClickNaviType;
}

const MovieCard = ({ movie, handleClick }: IProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const userFavorite = useSelector(
    (state: RootState) => state.favorite.favoriteMovie
  );
  const [anchorEl, setAnchorEl] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);
  const open = Boolean(anchorEl);
  const isFavoriteChecked = checkFavoriteMovieId(movie.id, userFavorite);
  const handleOpenMenu = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);
  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // firebase 업데이트 함수
  const handleFavorite = useCallback(
    async (
      e: MouseEvent<HTMLButtonElement>,
      movie: IMovieResult | Similrar
    ) => {
      e.preventDefault();
      if (user?.uid) {
        dispatch(setLoginAlertAction(false));
        const docRef = doc(db, 'users', user.email as string);
        const favoriteRef = collection(docRef, 'favorite');
        const favoriteDocRef = doc(favoriteRef, movie.id.toString());
        if (isFavoriteChecked) {
          await deleteDoc(favoriteDocRef);
        } else {
          await setDoc(doc(favoriteRef, movie.id.toString()), {
            movie,
          });
          dispatch(setToastAction(true));
        }
      } else {
        dispatch(setLoginAlertAction(true));
      }
    },
    [user, dispatch, isFavoriteChecked]
  );

  useEffect(() => {
    if (!user.uid) return;
    const toastTime = setTimeout(() => {
      dispatch(setToastAction(false));
    }, 2000);
    return () => {
      clearTimeout(toastTime);
    };
  }, [user, userFavorite, dispatch]);

  const handleOpenAddList = () => {
    if (user?.uid) {
      dispatch(setListMovieAction(movie));
      dispatch(setListModalAction(true));
      dispatch(setLoginAlertAction(false));
    } else {
      dispatch(setLoginAlertAction(true));
    }
    setAnchorEl(null);
  };

  return (
    <CardItem
      sx={{
        minWidth: '100%',
        minHeight: 300,
        boxShadow: 'none',
        position: 'relative',
        mt: 1,
      }}
    >
      {/* IMG */}
      <MoviePosterImg movie={movie} handleClick={handleClick} />

      {/* 좋아요 버튼 */}
      <IconButton
        aria-label="favorite"
        sx={{
          position: 'absolute',
          top: 5,
          right: 5,
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
          <FavoriteBorder id="likeBtn" sx={{ width: '1rem', height: '1rem' }} />
        )}
      </IconButton>

      {/* 리스트 만들기 버튼 */}
      <IconButton
        aria-label="settings"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          position: 'absolute',
          top: 42,
          right: 5,
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

const CardItem = styled(Card)`
  &:hover {
    h2 {
      color: var(--yellow-text-color);
    }
  }
`;
