import React from 'react';

import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
const CardSkeleton = () => {
  return (
    <>
      <Box
        sx={{
          borderRadius: '10px',
          minHeight: 248.99,
          // maxHeight: 249,
          width: '100%',
          overflow: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <Skeleton
          animation="wave"
          variant="rectangular"
          sx={{
            minHeight: 'inherit',
          }}
        />

        <Skeleton animation="wave" height={10} style={{ margin: '6px 0' }} />
        <Skeleton animation="wave" height={15} width="80%" />
      </Box>
    </>
  );
};

export default CardSkeleton;
