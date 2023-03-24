import React, { lazy, useEffect, useState, Suspense, useCallback } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SimilarType } from '../../types/similarType';
import Loader from '../../components/common/Loader';
import { useNavigate } from 'react-router-dom';
import { requestData } from '../../api/TMDB/request';
import { METHOD_CONS } from '../../constants/fetchMethod';
import { HandleClickNaviType } from '../../types/handleClickNaviType';
import GridItemProvider from '../../components/common/GridItemProvider';
import ScrollWrapBox from '../../components/scrollGrid/ScrollWrapBox';
const MovieCard = lazy(() => import('../movies/MovieCard'));
interface SimilarPageProps {
  urlPath: string;
}
const SimilarPage = ({ urlPath }: SimilarPageProps) => {
  const [similar, setSimilar] = useState<SimilarType>([]);
  const navigate = useNavigate();
  const type = urlPath.split('/')[0];
  const similarFetch = useCallback(async (urlPath: string) => {
    const url = `${urlPath}/similar`;
    const res = await requestData(url, METHOD_CONS.get);
    setSimilar(res.data.results);
  }, []);
  useEffect(() => {
    similarFetch(urlPath);
  }, [urlPath, similarFetch]);

  const handleClick: HandleClickNaviType = useCallback(
    (id, _) => {
      navigate(`/details/${type}/${id}`, { state: { type, id } });
    },
    [navigate, type]
  );
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" fontWeight={500}>
        추천 컨텐츠
      </Typography>
      <ScrollWrapBox>
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
      </ScrollWrapBox>
    </Box>
  );
};

export default SimilarPage;
