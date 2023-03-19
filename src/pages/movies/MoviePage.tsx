import { lazy, Suspense } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Loader from '../../components/common/Loader';

import PaginationComp from '../../components/common/PaginationComp';
import PageTitle from '../../components/common/PageTitle';
import useFetchHooks from '../hooks/useFetchHooks';
import GridItemProvider from '../../components/common/GridItemProvider';
import { HandleClickNaviType } from '../../types/Types';
const MovieCard = lazy(() => import('./MovieCard'));

const MoviePage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { totalPage, setPage, page, datas } = useFetchHooks(pathname);

  const handleClick: HandleClickNaviType = (id, type) => {
    navigate(`/details/${type}/${id}`, { state: { type, id } });
  };
  //  JSX
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
