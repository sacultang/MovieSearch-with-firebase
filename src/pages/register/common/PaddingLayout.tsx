import React from 'react';
import { Container, Box } from '@mui/material';
interface PaddingLayoutProps {
  children: [React.ReactElement, React.ReactElement];
}
const PaddingLayout = ({ children }: PaddingLayoutProps) => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ minHeight: '80vh', display: 'flex' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default PaddingLayout;
