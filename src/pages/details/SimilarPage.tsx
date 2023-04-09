import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SimilarType } from '../../types/similarType';
import GridItemProvider from '../../components/common/GridItemProvider';
import ScrollWrapBox from '../../components/scrollGrid/ScrollWrapBox';
import useHandleNavigate from '../hooks/useHandleNavigate';
import MovieCard from '../movies/MovieCard';
interface SimilarPageProps {
  similarData: SimilarType[];
}
const SimilarPage = ({ similarData }: SimilarPageProps) => {
  const handleClickNavigate = useHandleNavigate();

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" fontWeight={500}>
        추천 컨텐츠
      </Typography>
      <ScrollWrapBox>
        <Grid container direction="row" flexWrap="nowrap" mb={3} mt={3}>
          {similarData.map((movie) => (
            <GridItemProvider key={movie.id}>
              <MovieCard
                movie={movie}
                handleClickNavigate={handleClickNavigate}
                scrollcard="true"
              />
            </GridItemProvider>
          ))}
        </Grid>
      </ScrollWrapBox>
    </Box>
  );
};

export default SimilarPage;
