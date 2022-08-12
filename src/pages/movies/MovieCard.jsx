import { useState, useCallback, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setToastAction } from '../../store/toastSlice';
import {
  setFavoriteAction,
  removeFavoriteAction,
} from '../../store/favoriteListSlice';
import { checkClip } from '../../utils/checkSome';

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
import CreateIcon from '@mui/icons-material/Create';
import '../../firebase';
import {
  doc,
  onSnapshot,
  getDocs,
  collection,
  addDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';

// component
import SubMenuList from './SubMenuList';
import PopupModal from '../../components/PopupModal/PopupModal';
import MoviePosterImg from './MoviePosterImg';
import UpdateDocHook from '../../utils/UpdateDocHook';

const MovieCard = ({ movie, onClick }) => {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const userFavorite = useSelector((state) => state.favorite.favorite);

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [subAnchorEl, setSubAnchorEl] = useState(null);
  const [newFavorite, setNewFavorite] = useState([]);

  const open = Boolean(anchorEl);
  const subOpen = Boolean(subAnchorEl);
  const detailType = location.pathname.split('/')[1];

  const updateFavorite = UpdateDocHook(user);
  const handleOpenMenu = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, []);
  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
    setSubAnchorEl(null);
  }, []);
  const handleSubClose = (e) => {
    setSubAnchorEl(null);
  };

  // firebase 업데이트 함수

  const handleFavorite = useCallback(
    async (movie) => {
      user?.uid ? setOpenModal(false) : setOpenModal(true);

      // 즐겨찾기 추가 업데이트
      // 뒤로 쌓여야 한다.
      const docRef = doc(db, 'users', user.email);
      const favoriteRef = collection(docRef, 'favorite');
      const favoriteDocRef = doc(favoriteRef, movie.id.toString());
      // console.log(favoriteDocRef.path);
      if (!checkClip(movie.id, userFavorite)) {
        console.log('userFavorite', userFavorite);
        console.log('card Add');
        await setDoc(doc(favoriteRef, movie.id.toString()), {
          movie,
        }).then((res) => console.log(res));
        // dispatch(setFavoriteAction(movie));

        dispatch(setToastAction(true));
      } else {
        console.log('delete');
        await deleteDoc(favoriteDocRef).then(() => console.log('delete'));
        // dispatch(removeFavoriteAction(movie));
      }

      // console.log(newFavorite);
      // await updateFavorite(newFavorite);
      // setTimeout(() => {
      //   updateFavorite(newFavorite);
      // }, 300);
    },

    [user.uid, userFavorite, dispatch]
  );

  // useEffect(() => {
  //   setNewFavorite(userFavorite);
  // }, [userFavorite, setNewFavorite]);

  useEffect(() => {
    if (!user.uid) return;
    if (!newFavorite) {
    }
    // updateFavorite(userFavorite);
    // updateFavorite(updateRes);
  }, [newFavorite, updateFavorite, user, dispatch, userFavorite]);

  useEffect(() => {
    if (!user.uid) return;
    const updateTime = setTimeout(() => {
      // updateFavorite(userFavorite);
    }, 500);
    const toastTime = setTimeout(() => {
      dispatch(setToastAction(false));
      // updateFavorite(newFavorite);
    }, 2000);
    return () => {
      clearTimeout(toastTime);
      clearTimeout(updateTime);
    };
  }, [user, userFavorite, dispatch, updateFavorite]);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleAddList = (e, movie) => {
    setSubAnchorEl(e.currentTarget);
    // if (favoriteList.length === 0) {
    // }
    // console.log(favoriteList);
  };

  return (
    <>
      <CardItem
        sx={{
          minWidth: '100%',
          minHeight: 250,
          boxShadow: 'none',
          position: 'relative',
          mt: 1,
        }}
      >
        {/* IMG */}
        <MoviePosterImg
          movie={movie}
          onClick={() => onClick(movie.id, detailType || movie.media_type)}
          detailType={detailType}
        />

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
          onClick={() => handleFavorite(movie)}
        >
          {checkClip(movie.id, userFavorite) && user.uid ? (
            <FavoriteIcon
              sx={{ color: '#ff5d5d', width: '1rem', height: '1rem' }}
            />
          ) : (
            <FavoriteBorder sx={{ width: '1rem', height: '1rem' }} />
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
          <MoreVertIcon sx={{ width: '1rem', height: '1rem' }} />
        </IconButton>
        <Menu
          id="list-positioned-menu"
          aria-labelledby="list-positioned-button"
          open={open}
          onClose={handleCloseMenu}
          anchorEl={anchorEl}
        >
          <MenuItem
            onClick={(e) => {
              handleAddList(e, movie);
            }}
          >
            <ListIcon sx={{ width: '1rem' }} />
            <Typography
              gutterBottom
              variant="body"
              sx={{ fontSize: '0.8rem', mb: 0 }}
            >
              &nbsp;목록에 추가
            </Typography>
          </MenuItem>
          <SubMenuList
            subOpen={subOpen}
            subAnchorEl={subAnchorEl}
            handleSubClose={handleSubClose}
          />
          <MenuItem onClick={handleCloseMenu}>
            <CreateIcon
              sx={{
                width: '1rem',
                height: '1rem',
              }}
            />
            <Typography
              gutterBottom
              variant="body"
              sx={{ fontSize: '0.8rem', mb: 0 }}
            >
              &nbsp;리뷰 쓰기
            </Typography>
          </MenuItem>
        </Menu>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pt: 1,
          }}
        >
          <Typography
            gutterBottom
            variant="body"
            sx={{ fontSize: '0.8rem', mr: 1, mb: 0 }}
          >
            {movie?.release_date || movie?.first_air_date}
          </Typography>
          <Typography
            gutterBottom
            variant="body"
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
          sx={{ fontSize: '1rem', fontWeight: 700, pt: 1, pb: 1 }}
        >
          {movie?.original_title
            ? movie?.original_title.length > 15
              ? movie?.original_title.slice(0, 17) + ' ...'
              : movie?.original_title
            : movie?.original_name}
        </Typography>
        <PopupModal open={openModal} onClose={handleCloseModal} />
      </CardItem>
    </>
  );
};

export default memo(MovieCard);

const CardItem = styled(Card)`
  &:hover {
    /* &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-bottom: 5px solid var(--yellow-text-color);
    } */
    h2 {
      color: var(--yellow-text-color);
    }
  }
`;
