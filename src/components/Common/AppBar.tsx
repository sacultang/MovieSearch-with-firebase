import { useCallback, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router-dom';
import { styled, Theme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import DrawerMenu from './DrawerMenu';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import RegisterGroup from '../RegisterGroup';
import { theme } from '../../theme';
export default function PermanentDrawerLeft() {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

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
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          sx={{
            zIndex: 1251,
            backgroundColor: 'primary.main',
          }}
          position="fixed"
          open={open}
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
        <DrawerMenu open={open} setOpen={setOpen} />

        <Container
          component="main"
          sx={{
            flex: 1,
            bgcolor:
              `${theme.palette.mode}` === 'dark'
                ? 'primary.main'
                : 'primary.light',
            p: 2,
            pt: {
              xs: 9,
              sm: 9,
              md: 9,
              lg: 9,
              xl: 9,
            },
            boxSizing: 'border-box',
            maxWidth: {
              xs: open ? 'calc(100% - 200px)' : 'xs',
              sm: open ? 'calc(100% - 200px)' : 'sm',
              md: 'md',
              lg: 'lg',
              xl: 'calc(100% - 200px)',
            },
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </>
  );
}
