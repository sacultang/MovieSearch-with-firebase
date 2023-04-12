import React from 'react';
import { Container } from '@mui/material';
interface PageContainerProp {
  children: React.ReactNode;
  minHeight?: number;
}
const PageContainer = ({ children, minHeight }: PageContainerProp) => {
  return (
    <Container
      sx={{
        flexGrow: 1,
        minHeight: minHeight ? minHeight : 2600,
        height: 'auto',
      }}
    >
      {children}
    </Container>
  );
};

export default PageContainer;
