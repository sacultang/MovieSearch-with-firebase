import { lazy, Suspense } from 'react';

import { useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Loader from '../../components/common/Loader';

import PaginationComp from '../../components/common/PaginationComp';
import PageTitle from '../../components/common/PageTitle';
import useFetchHooks from '../hooks/useFetchHooks';
import GridItemProvider from '../../components/common/GridItemProvider';
import useHandleNavigate from '../hooks/useHandleNavigate';
const MovieCard = lazy(() => import('./MovieCard'));

const MoviePage = () => {
  const { pathname } = useLocation();
  const { totalPage, setPage, page, datas } = useFetchHooks(pathname);
  const handleClick = useHandleNavigate();

  return (
    <Container sx={{ flexGrow: 1 }}>
      <PageTitle url={pathname} />
      <Grid container>
        {datas.results &&
          datas.results.map((movie) => (
            <GridItemProvider key={movie.id}>
              <Suspense fallback={<Loader />}>
                <MovieCard movie={movie} handleClick={handleClick} />
              </Suspense>
            </GridItemProvider>
          ))}
      </Grid>

      <PaginationComp setPage={setPage} page={page} totalPage={totalPage} />
    </Container>
  );
};

export default MoviePage;
