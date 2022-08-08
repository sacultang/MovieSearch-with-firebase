import React from 'react';
import { LogoDiv } from './DrawerCSS';
import RegisterGroup from '../RegisterGroup';
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
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import { styled } from '@mui/material/styles';
const drawerWidth = 200;
const moviePath = [
  { text: '인기', path: '/movie/popular', icon: <StarPurple500Icon /> },
  { text: '현재 상영중', path: '/movie/now_playing', icon: <LiveTvIcon /> },
  { text: '개봉 예정', path: '/movie/upcoming', icon: <LiveTvIcon /> },
  { text: '높은 평점', path: '/movie/top_rated', icon: <LiveTvIcon /> },
];

const tvPath = [
  { text: '인기', path: '/tv/popular', icon: <StarPurple500Icon /> },
  { text: '오늘 방영', path: '/tv/airing_today', icon: <LiveTvIcon /> },
  { text: 'TV 방영중', path: '/tv/on_the_air', icon: <LiveTvIcon /> },
  { text: '높은 평점', path: '/tv/top_rated', icon: <LiveTvIcon /> },
];

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
          justifyContent: 'space-between',
        }}
      >
        <Link to="/">
          <LogoDiv />
        </Link>
        <RegisterGroup />
      </Toolbar>
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
    </Drawer>
  );
};

export default DrawerMenu;
