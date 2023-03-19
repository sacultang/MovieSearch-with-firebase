import React from 'react';
import Skeleton from '@mui/material/Skeleton';
const DetailPosterSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="rectangular"
        width={300}
        height={450}
        sx={{ borderRadius: 3 }}
      />
    </>
  );
};

export default DetailPosterSkeleton;
