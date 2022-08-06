import React from 'react';
import { Container, Box } from '@mui/material';

const PaddingLayout = ({ children }) => {
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
