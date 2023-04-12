import { DetailedHTMLProps, HTMLAttributes, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import DrawerMenu from '../Drawer/DrawerMenu';
import RegisterGroup from '../RegisterGroup';
import Footer from './Footer';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import HideAppBarOnScroll from './HideAppBarOnScroll';

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
        <AppBar>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerOpen}
              aria-label="drawer open"
            >
              <MenuIcon />
            </IconButton>
            <RegisterGroup />
          </Toolbar>
        </AppBar>
      </HideAppBarOnScroll>
      <DrawerMenu barOpen={barOpen} handleDrawerClose={handleDrawerClose} />
      <MainContainer component="main">
        <Outlet />
      </MainContainer>
      <Footer />
    </>
  );
};
export default AppMenuBar;
type MainContainerProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  component?: React.ElementType;
};

const MainContainer = styled(Container)<MainContainerProps>`
  flex: 1;
  padding: 2;
  box-sizing: 'border-box';
  width: {
    xs: '485px';
    sm: '600px';
    md: '900px';
    lg: '1200px';
    xl: '1536px';
  }
  height: 'auto';
  margin-top: 80px;
`;
