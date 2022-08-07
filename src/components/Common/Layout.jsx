import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import FullSearchLayout from '../../pages/home/search/FullSearchLayout';
const Layout = () => {
  return (
    <>
      <Wrapper>
        <Header />
        <FullSearchLayout />
        <Container>
          <Outlet />
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Layout;

const Wrapper = styled.div`
  height: auto;
  min-height: 100%;
  position: relative;
`;
