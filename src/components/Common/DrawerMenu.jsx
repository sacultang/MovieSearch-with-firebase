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
const drawerWidth = 200;
const moviePath = [
  { text: '인기', path: '/movie/popular' },
  { text: '현재 상영중', path: '/movie/now_playing' },
  { text: '개봉 예정', path: '/movie/upcoming' },
  { text: '높은 평점', path: '/movie/top_rated' },
];

const tvPath = [
  { text: '인기', path: '/tv/popular' },
  { text: '오늘 방영', path: '/tv/airing_today' },
  { text: 'TV 방영중', path: '/tv/on_the_air' },
  { text: '높은 평점', path: '/tv/top_rated' },
];
const myPage = [{ text: '즐겨찾기', path: '/favorite' }];
const buttonHandler = ({ isActive }) => {
  return {
    width: '100%',
    backgroundColor: isActive ? '#f3f3f3' : '',
    borderLeft: isActive ? '4px solid var(--yellow-text-color)' : '',
  };
};

const DrawerMenu = ({ open }) => {
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
          <LogoDiv />
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
        <Typography
          variant="h6"
          fontWeight={600}
          fontSize={'1.2rem'}
          p={1}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <MovieIcon sx={{ mr: 1 }} /> Movie
        </Typography>

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
        <Typography
          variant="h6"
          fontWeight={600}
          fontSize={'1.2rem'}
          p={1}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <LiveTvIcon sx={{ mr: 1 }} /> TV
        </Typography>

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
        <Typography
          variant="h6"
          fontWeight={600}
          fontSize={'1.2rem'}
          p={1}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <AccountCircleIcon sx={{ mr: 1 }} /> My Page
        </Typography>

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
      </List>
    </Drawer>
  );
};

export default DrawerMenu;
