import Typography from '@mui/material/Typography';
import { SimilarType } from '../../types/similarType';
import PageGridItem from '../../components/pageGrid/PageGridItem';
import ScrollWrapBox from '../../components/scrollGrid/ScrollWrapBox';
import ScrollGridContainer from '../../components/scrollGrid/ScrollGridContainer';
import useHandleNavigate from '../hooks/useHandleNavigate';
import MovieCard from '../movies/MovieCard';
import TabLayout from '../../components/scrollGrid/TabLayout';
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
            <PageGridItem key={movie.id} scrollcard="true">
              <MovieCard
                movie={movie}
                handleClickNavigate={handleClickNavigate}
                scrollcard="true"
              />
            </PageGridItem>
          ))}
        </ScrollGridContainer>
      </ScrollWrapBox>
    </TabLayout>
  );
};

export default SimilarPage;
