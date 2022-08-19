import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setListAction } from '../../store/listMovieSlice';
import { LogoDiv } from './DrawerCSS';

import MovieIcon from '@mui/icons-material/Movie';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Link, NavLink } from 'react-router-dom';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchInput from '../../pages/home/SearchInput';
import { drawerWidth, moviePath, tvPath, myPage } from './DrawerMenuList';
import { db } from '../../firebase';
import { onSnapshot, doc, collection } from 'firebase/firestore';

type NavStyleType = {
  isActive: boolean;
};
const buttonHandler = ({ isActive }: NavStyleType) => {
  return {
    width: '100%',
    backgroundColor: isActive ? '#f3f3f3' : '',
    borderLeft: isActive ? '4px solid var(--yellow-text-color)' : '',
  };
};
interface IProps {
  open: boolean;
}
type MyListType = {
  id: string;
  list: [];
};
const DrawerMenu = ({ open }: IProps) => {
  console.log('drawer 레ㄴ더링');
  const [myList, setMyList] = useState<MyListType[]>([]);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    if (!!user.uid) {
      // getFavoList();
      const docRef = doc(db, 'users', user.email!);
      const favoriteRef = collection(docRef, 'list');

      const unsubs = onSnapshot(favoriteRef, (snapshot) => {
        const res = snapshot.docs.map((doc) => ({
          id: doc.id,
          list: doc.data()?.list,
        }));
        dispatch(setListAction(res));
        setMyList(res);
      });
      return () => {
        unsubs();
      };
    }
  }, [dispatch, user]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        display: {
          xs: open ? 'block' : 'none',
          sm: open ? 'block' : 'none',
          md: 'block',
        },
        zIndex: 1252,
      }}
      variant="permanent"
      anchor="left"
      open={open}
    >
      <Toolbar
        sx={{
          backgroundColor: 'var(--main-bg-color)',
        }}
      >
        <Link to="/">
          <LogoDiv>
            <div aria-hidden={true}>메인</div>
          </LogoDiv>
        </Link>
        <Link to="/">
          <Typography
            variant="h6"
            fontWeight={600}
            fontSize={'1.2rem'}
            color="#fff"
          >
            MOVIE
          </Typography>
        </Link>
      </Toolbar>
      <Divider />
      <List>
        <ListItem>
          <SearchInput border="drawer" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Typography
            variant="h6"
            fontWeight={600}
            fontSize={'1.2rem'}
            p={1}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <MovieIcon sx={{ mr: 1 }} /> Movie
          </Typography>
        </ListItem>
        {moviePath.map((list, index) => (
          <ListItem key={list.text} disablePadding>
            <NavLink to={`${list.path}`} style={buttonHandler}>
              <ListItemButton>
                <ListItemText
                  primary={list.text}
                  sx={{ color: 'var(--main-bg-color)' }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Typography
            variant="h6"
            fontWeight={600}
            fontSize={'1.2rem'}
            p={1}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <LiveTvIcon sx={{ mr: 1 }} /> TV
          </Typography>
        </ListItem>
        {tvPath.map((list, index) => (
          <ListItem key={list.text} disablePadding>
            <NavLink to={`${list.path}`} style={buttonHandler}>
              <ListItemButton>
                <ListItemText
                  primary={list.text}
                  sx={{ color: 'var(--main-bg-color)' }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Typography
            variant="h6"
            fontWeight={600}
            fontSize={'1.2rem'}
            p={1}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <AccountCircleIcon sx={{ mr: 1 }} /> My Page
          </Typography>
        </ListItem>
        {myPage.map((list, index) => (
          <ListItem key={list.text} disablePadding>
            <NavLink to={`${list.path}`} style={buttonHandler}>
              <ListItemButton>
                <ListItemText
                  primary={list.text}
                  sx={{ color: 'var(--main-bg-color)' }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
        {user.uid &&
          myList.map((list) => (
            <ListItem key={list.id} disablePadding>
              <NavLink to={`/list/${list.id}`} style={buttonHandler}>
                <ListItemButton>
                  <ListItemText
                    primary={list.id}
                    sx={{ color: 'var(--main-bg-color)' }}
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};

export default DrawerMenu;
