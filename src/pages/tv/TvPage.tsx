import { lazy, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import Loader from '../../components/common/Loader';
import PaginationComp from '../../components/common/PaginationComp';

import PageTitle from '../../components/common/PageTitle';
import useFetchHooks from '../hooks/useFetchHooks';
import { HandleClickNaviType } from '../../types/Types';
import GridItemProvider from '../../components/common/GridItemProvider';
const MovieCard = lazy(() => import('../movies/MovieCard'));
const TvPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { totalPage, setPage, page, datas } = useFetchHooks(pathname);

  const handleClick: HandleClickNaviType = (id, type) => {
    navigate(`/details/${type}/${id}`, { state: { type, id } });
  };

  return (
    <Container sx={{ flexGrow: 1 }}>
      <PageTitle url={pathname} />
      <Grid container>
        {datas.results &&
          datas.results.map((tv) => (
            <GridItemProvider key={tv.id}>
              <Suspense fallback={<Loader />}>
                <MovieCard movie={tv} handleClick={handleClick} />
              </Suspense>
            </GridItemProvider>
          ))}
      </Grid>

      <PaginationComp setPage={setPage} page={page} totalPage={totalPage} />
    </Container>
  );
};

export default TvPage;
