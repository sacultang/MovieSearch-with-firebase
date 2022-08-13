import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
const PageNotFound = () => {
  useEffect(() => {}, []);
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Typography variant="h4">잘못된 접근입니다.</Typography>
    </Box>
  );
};

export default PageNotFound;
