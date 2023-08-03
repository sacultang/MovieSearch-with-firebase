import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

const MainContainer = () => {
  return (
    <SContainer component="main">
      <Outlet />
    </SContainer>
  );
};

export default MainContainer;
type ContainerProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  component?: React.ElementType;
};

const SContainer = styled(Container)<ContainerProps>`
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
