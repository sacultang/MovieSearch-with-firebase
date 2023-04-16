import Grid from '@mui/material/Grid';
import { useRef } from 'react';
import useIsVisible from '../../pages/movies/hooks/useIsVisible';
import SkeletonCard from '../SkeletonCard';
import useGetCardWidth from '../../pages/movies/hooks/useGetCardWidth';
interface GridItemProps {
  children: React.ReactNode;
  scrollcard?: string;
  credit?: string;
}
const PageGridItem = ({ children, scrollcard, credit }: GridItemProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { cardWidth } = useGetCardWidth(cardRef);
  const { isVisible } = useIsVisible(cardRef);

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={6}
      lg={4}
      xl={3}
      position="relative"
      height="auto"
      ref={cardRef}
    >
      {isVisible ? (
        children
      ) : (
        <SkeletonCard
          cardWidth={cardWidth}
          scrollcard={scrollcard}
          credit={credit}
        />
      )}
    </Grid>
  );
};

export default PageGridItem;
