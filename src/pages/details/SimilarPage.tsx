import React, { lazy, useEffect, useState, Suspense, useCallback } from 'react';
import { getSimilar } from '../../api/TMDB/Details/getDetails';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SimilarType } from '../../types/similarType';
import Loader from '../../components/Common/Loader';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

const MovieCard = lazy(() => import('../movies/MovieCard'));
interface IProps {
  urlPath: string;
}
const SimilarPage = ({ urlPath }: IProps) => {
  const [similar, setSimilar] = useState<SimilarType>([]);
  const navigate = useNavigate();

  const type = urlPath.split('/')[0];

  const fetch = useCallback(async (urlPath: string) => {
    try {
      const res = await getSimilar(urlPath);
      setSimilar(res.results);
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    fetch(urlPath);
  }, [urlPath]);

  const handleClick = useCallback(
    (id: string) => {
      navigate(`/details/${type}/${id}`, { state: { type, id } });
    },
    [navigate, type]
  );
  return (
    <Box sx={{ overflow: 'scroll' }} mt={3}>
      <CssBaseline />
      <Typography variant="h5" fontWeight={500} mb={2}>
        추천 컨텐츠
      </Typography>
      <Grid
        container
        spacing={2}
        style={{ minHeight: '330px' }}
        direction="row"
        flexWrap="nowrap"
      >
        {similar.map((movie) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            xl={3}
            key={movie.id}
            sx={{ minWidth: 200 }}
          >
            <Suspense fallback={<Loader />}>
              <MovieCard movie={movie} handleClick={handleClick} />
            </Suspense>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SimilarPage;
