import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import styled from '@emotion/styled';
interface SkeletonCardProp {
  scrollcard?: string;
  credit?: string;
  cardWidth?: number;
}
const SkeletonCard = ({ scrollcard, credit, cardWidth }: SkeletonCardProp) => {
  return (
    <CardItem scrollcard={scrollcard}>
      <Box
        overflow="hidden"
        height={scrollcard ? 300 : `${cardWidth && (cardWidth * 3) / 2}px`}
      >
        <Skeleton height="100%" variant="rounded" width="100%" />
      </Box>
      <Box height={credit ? 40 : 68}>
        {!credit && (
          <Box overflow="hidden" p={1}>
            <Skeleton height={15} variant="rounded" />
          </Box>
        )}

        <Box overflow="hidden" p={1}>
          <Skeleton height={20} variant="rounded" />
        </Box>
      </Box>
    </CardItem>
  );
};

export default SkeletonCard;
const CardItem = styled(Card)<{ scrollcard: string | undefined }>`
  margin: 5px;
  position: relative;
  width: ${({ scrollcard }) => scrollcard && '200px'};
`;
