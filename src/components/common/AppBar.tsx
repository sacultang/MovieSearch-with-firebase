import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import DrawerMenu from './DrawerMenu';
import RegisterGroup from '../RegisterGroup';

export default function PermanentDrawerLeft() {
  const [barOpen, setBarOpen] = useState(false);

  const handleDrawerOpen = () => {
    setBarOpen(true);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton color="inherit" edge="start" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <RegisterGroup />
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        sx={{
          flex: 1,
          p: 2,
          pt: 9,
          boxSizing: 'border-box',
          width: {
            xs: '485px',
            sm: '600px',
            md: '900px',
            lg: '1200px',
            xl: '1536px',
          },
          height: 'auto',
        }}
      >
        <Outlet />
      </Container>
      <DrawerMenu barOpen={barOpen} setBarOpen={setBarOpen} />
    </>
  );
}
