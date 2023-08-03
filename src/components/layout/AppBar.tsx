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
import { useDispatch, useSelector } from 'react-redux';
import { setThemeAction } from '@/store/themeSlice';
import { RootState } from '@/store/store';
import Switch from '@mui/material/Switch';
const AppMenuBar = () => {
  const [barOpen, setBarOpen] = useState(false);
  const darkMode = useSelector((state: RootState) => state.themeMode.themeMode);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setBarOpen(false);
  }, [location.pathname]);

  const handleDrawerOpen = () => {
    setBarOpen(true);
  };
  const handleDrawerClose = () => {
    setBarOpen(false);
  };
  const setThemeMode = () => {
    dispatch(setThemeAction(!darkMode));
  };

  return (
    <>
      <HideAppBarOnScroll>
        <Toolbar
          sx={{ justifyContent: 'space-between', bgcolor: 'primary.main' }}
        >
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Switch
              onChange={setThemeMode}
              inputProps={{ 'aria-label': 'thememode-controller' }}
              defaultChecked={darkMode}
              color="info"
            />
            <RegisterGroup />
          </Box>
        </Toolbar>
      </HideAppBarOnScroll>
      <DrawerMenu barOpen={barOpen} handleDrawerClose={handleDrawerClose} />
    </>
  );
};
export default AppMenuBar;
