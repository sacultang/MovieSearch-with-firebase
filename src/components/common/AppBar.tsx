import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import DrawerMenu from './DrawerMenu';
import RegisterGroup from '../RegisterGroup';
import Footer from './Footer';
import styled from '@emotion/styled';
export default function PermanentDrawerLeft() {
  const [barOpen, setBarOpen] = useState(false);

  const handleDrawerOpen = () => {
    console.log('open click');
    setBarOpen(true);
  };
  useEffect(() => {
    console.log(barOpen);
  }, [barOpen]);
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
      <MainContainer component="main">
        <Outlet />
      </MainContainer>
      <Footer />
      <DrawerMenu barOpen={barOpen} setBarOpen={setBarOpen} />
    </>
  );
}

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
`;
