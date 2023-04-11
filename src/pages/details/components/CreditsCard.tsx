import Skeleton from '@mui/material/Skeleton';
import { CreditType } from '../../../types/creditType';
import { IMAGE_PATH } from '../../../constants/imagePath';
import Typography from '@mui/material/Typography';
import DefaultImage from '../../../assets/defaultImage.png';
import useIsImgLoaded from '../../hooks/useIsImageLoad';
import PageGridItem from '../../../components/pageGrid/PageGridItem';
import Card from '@mui/material/Card';
import styled from '@emotion/styled';
import sliceTextLength from '../../../utils/sliceText';
import { useMemo } from 'react';
interface CreditsCardProps {
  creditItem: CreditType;
}

const CreditsCard = ({ creditItem }: CreditsCardProps) => {
  const { imgRef, loaded } = useIsImgLoaded();
  const handleImageError = () => {
    if (imgRef.current) imgRef.current.src = DefaultImage;
  };
  const sliceCreditName = useMemo(() => {
    return sliceTextLength(creditItem.name);
  }, [creditItem.name]);

  return (
    <PageGridItem>
      <CardItem scrollcard={'true'}>
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
            width: '100%',
            height: '100%',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
          onError={handleImageError}
        />

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
    </PageGridItem>
  );
};

export default CreditsCard;

const CardItem = styled(Card)<{ scrollcard: string | undefined }>`
  margin: 5px;
  position: relative;
  width: ${({ scrollcard }) => scrollcard && '200px'};
`;
