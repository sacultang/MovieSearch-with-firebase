import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { LogoDiv } from './DrawerCSS';
import RegisterGroup from '../RegisterGroup';
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import Typography from '@mui/material/Typography';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
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

export default function PermanentDrawerLeft() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
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
      <Container
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        xs={12}
        sm={8}
        md={4}
        lg={2}
        xl={1}
      >
        <Outlet />
      </Container>
    </Box>
  );
}
