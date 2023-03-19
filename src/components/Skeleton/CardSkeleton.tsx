import React from 'react';

import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
interface CardSkeletonProp {
  cardWidth: number | null;
}
const CardSkeleton = ({ cardWidth }: CardSkeletonProp) => {
  return (
    <Box
      sx={{
        borderRadius: '10px',
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
          height: `${cardWidth && (cardWidth * 3) / 2}px`,
        }}
      />
    </Box>
  );
};

export default CardSkeleton;
