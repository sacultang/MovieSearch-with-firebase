import React, { useState, useCallback, useEffect, memo } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import { Stack, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import PopupModal from '../../components/PopupModal/PopupModal';
import { useDispatch } from 'react-redux';
import { checkClip } from '../../utils/checkSome';
import CreateIcon from '@mui/icons-material/Create';
import SubMenuList from './SubMenuList';

import {
  getDoc,
  doc,
  collection,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import '../../firebase';
import { db } from '../../firebase';

const MovieCard = ({
  movie,
  userFavorite,
  setUserFavorite,
  setFavoriteList,
  favoriteList,
}) => {
  const user = useSelector((state) => state.user.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const [imgLoading, setImgLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [subAnchorEl, setSubAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const subOpen = Boolean(subAnchorEl);
  const docRef = doc(db, 'users', user.uid);
  const dataCollectionRef = collection(docRef, user.uid);
  // console.log(dataCollectionRef);

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
  useEffect(() => {
    if (user) {
      const getData = async () => {
        const docSnap = await getDoc(docRef);
        // console.log(docSnap.data());
        if (docSnap.data()) {
          setFavoriteList((prev) => [...prev, ...docSnap.data().list]);
        }
        // console.log(userFavorite);
        // const data = await getDocs(dataCollectionRef);
        // data.docs.map((doc) => console.log());
        // const queryRef = query(dataCollectionRef, where(user.uid, '==', user));
      };
      getData();
      // const unsubs = onSnapshot(doc(db, 'users', user.uid), (doc) => {
      //   // const newFaArr = doc.data().favorite.map();
      //   // console.log(newFaArr);
      //   setUserFavorite((prev) => [...prev, ...doc.data().favorite]);
      // });
      // return () => unsubs();
    }
  }, [user]);
  const updateFavorite = useCallback(
    async (userFavorite) => {
      try {
        await updateDoc(docRef, { favorite: userFavorite });
      } catch (e) {
        console.log(e);
      }
    },
    [docRef]
  );
  const handleFavorite = useCallback(
    async (movie) => {
      user ? setOpenModal(false) : setOpenModal(true);
      // 즐겨찾기 추가 업데이트
      // 뒤로 쌓여야 한다.
      // console.log(movie);
      if (!checkClip(movie, userFavorite)) {
        setUserFavorite((prev) => [...prev, movie]);
      } else {
        setUserFavorite((prev) => prev.filter((item) => item.id !== movie.id));
      }
      await updateFavorite(userFavorite);
      // console.log('newFavorite', newFavorite);
    },

    [user, setUserFavorite, userFavorite, updateFavorite]
  );

  useEffect(() => {}, [userFavorite]);
  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);
  const handleAddList = (e, movie) => {
    setSubAnchorEl(e.currentTarget);
    // if (favoriteList.length === 0) {
    // }
    // console.log(favoriteList);
  };
  // useEffect(() => {
  //   console.log(userFavorite);
  // }, [userFavorite]);
  return (
    <CardItem
      sx={{
        minWidth: 166,
        minHeight: 250,
        boxShadow: 'none',
        position: 'relative',
        m: 1,
      }}
    >
      {imgLoading ? (
        <Stack alignItems="center" justifyContent="center" height={250}>
          <CircularProgress color="secondary" size={30} />
          <CardImg
            component="img"
            image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            sx={{ display: 'none' }}
            onLoad={() => setImgLoading(false)}
          />
        </Stack>
      ) : (
        <CardImg
          component="img"
          image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          alt={
            movie.original_title ? movie.original_title : movie.original_name
          }
          sx={{ borderRadius: '10px', minHeight: 248.99 }}
        />
      )}

      <IconButton
        sx={{
          position: 'absolute',
          top: 5,
          right: 5,
          backgroundColor: 'rgba(221,221,221,0.57)',
          borderRadius: '50%',
        }}
        onClick={() => {
          handleFavorite(movie);
        }}
      >
        {checkClip(movie, userFavorite) ? (
          <FavoriteIcon
            sx={{ color: '#ff5d5d', width: '1rem', height: '1rem' }}
          />
        ) : (
          <FavoriteBorder sx={{ width: '1rem', height: '1rem' }} />
        )}
      </IconButton>

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
          {movie.release_date ? movie.release_date : movie.first_air_date}
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
          {movie.vote_average}
        </Typography>
      </Box>
      <Typography
        gutterBottom
        variant="h2"
        component="h2"
        sx={{ fontSize: '1rem', fontWeight: 700, pt: 1, pb: 1 }}
      >
        {movie.original_title
          ? movie.original_title.length > 15
            ? movie.original_title.slice(0, 17) + ' ...'
            : movie.original_title
          : movie.original_name}
      </Typography>
      <PopupModal open={openModal} onClose={handleCloseModal} />
    </CardItem>
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
const CardImg = styled(CardMedia)`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.03);
    /* &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border: 5px solid var(--yellow-text-color);
    } */
  }
`;
// const MovieImg = styled.img`
//   width: 100%;
// `;

// <CardMedia
//         component="img"
//         height="244"
//         image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
//         alt="Paella dish"
//       />
//       <CardContent>
//         <Typography
//           gutterBottom
//           variant="h5"
//           component="div"
//           sx={{ fontSize: '1rem' }}
//           textOverflow="hidden"
//         >
//           {movie.original_title}
//         </Typography>
//         <Typography variant="caption">{movie.release_date}</Typography>
