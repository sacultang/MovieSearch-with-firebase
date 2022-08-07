import React from 'react';
import { Stack, CircularProgress } from '@mui/material';
const Loader = () => {
  return (
    <Stack alignItems="center" justifyContent="center" height="100vh">
      <CircularProgress color="secondary" size={50} />
    </Stack>
  );
};

export default Loader;
