import React from 'react';
import Skeleton from '@mui/material/Skeleton';
const DetailSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="rectangular"
        width={300}
        height={450}
        sx={{ borderRadius: 20 }}
      />
    </>
  );
};

export default DetailSkeleton;
