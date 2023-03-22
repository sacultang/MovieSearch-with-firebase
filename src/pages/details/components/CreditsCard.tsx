import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import { Similrar } from '../../../types/creditType';
import { IMAGE_PATH } from '../../../constants/imagePath';
import Typography from '@mui/material/Typography';
import DefaultImage from '../../../assets/defaultImage.png';
import Box from '@mui/material/Box';
import { useIsImgLoaded } from '../../hooks/useIsImageLoad';

interface CreditsCardProps {
  creditItem: Similrar;
}

const CreditsCard = ({ creditItem }: CreditsCardProps) => {
  const { imgRef, loaded } = useIsImgLoaded();
  const handleImageError = () => {
    if (imgRef.current) imgRef.current.src = DefaultImage;
  };
  return (
    <Grid item minWidth={200} width={200} height={300} mr={2}>
      <Box
        borderRadius={1}
        overflow="hidden"
        height={'100%'}
        position="relative"
      >
        {!loaded && (
          <Skeleton
            sx={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        )}
        <img
          src={`${IMAGE_PATH.w200}/${creditItem.profile_path}`}
          ref={imgRef}
          alt={creditItem.profile_path ? creditItem.name : 'creadit people'}
          style={{
            cursor: 'pointer',
            width: '100%',
            height: '100%',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
          onError={handleImageError}
        />
      </Box>
      <Typography variant="subtitle1" fontWeight={500} mt={1}>
        {creditItem.name}
      </Typography>
    </Grid>
  );
};

export default CreditsCard;