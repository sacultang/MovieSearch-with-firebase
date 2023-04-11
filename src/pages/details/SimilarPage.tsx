import Typography from '@mui/material/Typography';
import { SimilarType } from '../../types/similarType';
import GridItemProvider from '../../components/common/GridItemProvider';
import ScrollWrapBox from '../../components/scrollGrid/ScrollWrapBox';
import ScrollGridContainer from '../home/components/ScrollGridContainer';
import useHandleNavigate from '../hooks/useHandleNavigate';
import MovieCard from '../movies/MovieCard';
import TabLayout from '../home/common/TabLayout';
interface SimilarPageProps {
  similarData: SimilarType[];
}
const SimilarPage = ({ similarData }: SimilarPageProps) => {
  const handleClickNavigate = useHandleNavigate();

  return (
    <TabLayout>
      <Typography variant="h5" fontWeight={500}>
        추천 컨텐츠
      </Typography>
      <ScrollWrapBox>
        <ScrollGridContainer>
          {similarData.map((movie) => (
            <GridItemProvider key={movie.id}>
              <MovieCard
                movie={movie}
                handleClickNavigate={handleClickNavigate}
                scrollcard="true"
              />
            </GridItemProvider>
          ))}
        </ScrollGridContainer>
      </ScrollWrapBox>
    </TabLayout>
  );
};

export default SimilarPage;
