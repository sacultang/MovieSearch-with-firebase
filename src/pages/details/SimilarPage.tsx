import React, { lazy, useEffect, useState, Suspense, useCallback } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SimilarType } from '../../types/similarType';
import Loader from '../../components/common/Loader';
import { useNavigate } from 'react-router-dom';
import { requestData } from '../../api/TMDB/baseUrl';
import { METHOD_CONS } from '../../constants/fetchMethod';
import { HandleClickNaviType } from '../../types/handleClickNaviType';
import GridItemProvider from '../../components/common/GridItemProvider';
const MovieCard = lazy(() => import('../movies/MovieCard'));
interface SimilarPageProps {
  urlPath: string;
}
const SimilarPage = ({ urlPath }: SimilarPageProps) => {
  const [similar, setSimilar] = useState<SimilarType>([]);
  const navigate = useNavigate();
  const type = urlPath.split('/')[0];
  const fetch = useCallback(async (urlPath: string) => {
    const url = `${urlPath}/similar`;
    const res = await requestData(url, METHOD_CONS.get);
    setSimilar(res.data.results);
  }, []);
  useEffect(() => {
    fetch(urlPath);
  }, [urlPath, fetch]);

  const handleClick: HandleClickNaviType = useCallback(
    (id, _) => {
      navigate(`/details/${type}/${id}`, { state: { type, id } });
    },
    [navigate, type]
  );
  return (
    <Box
      sx={{
        mt: 3,
      }}
    >
      <Typography variant="h5" fontWeight={500}>
        추천 컨텐츠
      </Typography>
      <Box
        sx={{
          overflow: 'scroll',
          '&::-webkit-scrollbar': { width: 1, height: 8 },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0,0,0,0.07)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'var( --main-bg-color)',
            borderRadius: '5px',
          },
        }}
      >
        <Grid container direction="row" flexWrap="nowrap" mb={3} mt={3}>
          {similar.map((movie) => (
            <GridItemProvider key={movie.id}>
              <Suspense fallback={<Loader />}>
                <MovieCard
                  movie={movie}
                  handleClick={handleClick}
                  scrollcard="true"
                />
              </Suspense>
            </GridItemProvider>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SimilarPage;
