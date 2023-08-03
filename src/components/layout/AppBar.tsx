import { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import DrawerMenu from '../Drawer/DrawerMenu';
import RegisterGroup from '../RegisterGroup';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import HideAppBarOnScroll from './HideAppBarOnScroll';
import MainLogo from '../common/MainLogo';

const AppMenuBar = () => {
  const [barOpen, setBarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setBarOpen(false);
  }, [location.pathname]);

  const handleDrawerOpen = () => {
    setBarOpen(true);
  };
  const handleDrawerClose = () => {
    setBarOpen(false);
  };

  return (
    <>
      <HideAppBarOnScroll>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MainLogo />
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerOpen}
              aria-label="drawer open"
              sx={{ minHeight: 64 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <RegisterGroup />
        </Toolbar>
      </HideAppBarOnScroll>
      <DrawerMenu barOpen={barOpen} handleDrawerClose={handleDrawerClose} />
    </>
  );
};
export default AppMenuBar;
