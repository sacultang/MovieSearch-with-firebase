import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setBarOpen } from '../../store/barOpenCloseSlice';
import { Outlet } from 'react-router-dom';
import MuiAppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styled from '@emotion/styled';
import { Theme } from '@mui/material/styles';
import { theme } from '../../theme';
import DrawerMenu from './DrawerMenu';
import RegisterGroup from '../RegisterGroup';

export default function PermanentDrawerLeft() {
  const dispatch = useDispatch();
  const barOpen = useSelector((state: RootState) => state.barOpen.barOpen);
  const handleDrawerOpen = useCallback(() => {
    dispatch(setBarOpen(!barOpen));
  }, [barOpen, dispatch]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        sx={{
          zIndex: 1251,
          backgroundColor: 'primary.main',
        }}
        position="fixed"
        open={barOpen}
        theme={theme}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <RegisterGroup />
        </Toolbar>
      </AppBar>

      <DrawerMenu barOpen={barOpen} />

      <Container
        component="main"
        sx={{
          flex: 1,
          p: 2,
          pt: 9,
          boxSizing: 'border-box',
          maxWidth: {
            xs: barOpen ? 'calc(100% - 200px)' : 'xs',
            sm: barOpen ? 'calc(100% - 200px)' : 'sm',
            md: 'md',
            lg: 'lg',
            xl: 'calc(100% - 200px)',
          },
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }: { theme: Theme; open: boolean }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - 200px)`,
    marginLeft: `200px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
