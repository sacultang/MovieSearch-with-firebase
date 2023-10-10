import { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerMenu from '../Drawer/DrawerMenu';
import RegisterGroup from '../RegisterGroup';
import { useLocation } from 'react-router-dom';
import FlexBox from '../ui/FlexBox';
import MainLogo from '../common/MainLogo';
import { useDispatch, useSelector } from 'react-redux';
import { setThemeAction } from '@/store/themeSlice';
import { RootState } from '@/store/store';
import Switch from '@mui/material/Switch';
import AppBar from '@mui/material/AppBar';
const Header = () => {
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
      <AppBar
        sx={{
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'primary.light',
          backgroundImage: 'none',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <FlexBox alignItems="center">
            <MainLogo />
            <IconButton
              edge="start"
              onClick={handleDrawerOpen}
              aria-label="drawer open"
            >
              <MenuIcon />
            </IconButton>
          </FlexBox>
          <FlexBox alignItems="center">
            <Switch
              onChange={setThemeMode}
              inputProps={{ 'aria-label': 'thememode-controller' }}
              checked={darkMode}
              color="info"
            />
            <RegisterGroup />
          </FlexBox>
        </Toolbar>
      </AppBar>

      <DrawerMenu barOpen={barOpen} handleDrawerClose={handleDrawerClose} />
    </>
  );
};
export default Header;
