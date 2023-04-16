import { useMemo } from 'react';
import { CreditType } from '../../../types/creditType';
import { IMAGE_PATH } from '../../../constants/imagePath';
import Typography from '@mui/material/Typography';
import DefaultImage from '../../../assets/defaultImage.png';
import useIsImgLoaded from '../../hooks/useIsImageLoad';
import Card from '@mui/material/Card';
import styled from '@emotion/styled';
import sliceTextLength from '../../../utils/sliceText';
import Box from '@mui/material/Box';
interface CreditsCardProps {
  creditItem: CreditType;
}

const CreditsCard = ({ creditItem }: CreditsCardProps) => {
  const { imgRef, loaded, setLoaded } = useIsImgLoaded();
  const handleImageError = () => {
    if (imgRef.current) imgRef.current.src = DefaultImage;
    setLoaded(true);
  };
  const sliceCreditName = useMemo(() => {
    return sliceTextLength(creditItem.name);
  }, [creditItem.name]);

  return (
    <CardItem scrollcard={'true'}>
      <Box
        sx={{
          height: `${(200 * 3) / 2}px`,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={`${IMAGE_PATH.w200}/${creditItem.profile_path}`}
          ref={imgRef}
          loading="lazy"
          alt={creditItem.profile_path ? creditItem.name : 'creadit people'}
          style={{
            width: '100%',
            height: '100%',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
          onError={handleImageError}
        />
      </Box>
      <Typography
        gutterBottom
        variant="h2"
        component="h2"
        sx={{
          fontSize: '1rem',
          fontWeight: 700,
          pt: 1,
          pb: 1,
          pr: 1,
          pl: 1,
        }}
      >
        {sliceCreditName}
      </Typography>
    </CardItem>
  );
};

export default CreditsCard;

const CardItem = styled(Card)<{ scrollcard: string | undefined }>`
  margin: 5px;
  position: relative;
  width: ${({ scrollcard }) => scrollcard && '200px'};
`;
