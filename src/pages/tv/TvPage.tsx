import { lazy, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import Loader from '../../components/Common/Loader';
import PaginationComp from '../../components/Common/PaginationComp';

import PageTitle from '../../components/Common/PageTitle';
import FetchHooks from '../../hooks/FetchHooks';
const MovieCard = lazy(() => import('../movies/MovieCard'));
const TvPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { totalPage, setPage, page, datas } = FetchHooks(pathname);

  const handleClick = (id: string, type: string) => {
    navigate(`/details/${type}/${id}`, { state: { type, id } });
  };

  return (
    <Container sx={{ flexGrow: 1 }}>
      <PageTitle url={pathname} />
      <Grid container spacing={2}>
        {datas.results &&
          datas.results.map((tv) => (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={tv.id}>
              <Suspense fallback={<Loader />}>
                <MovieCard movie={tv} handleClick={handleClick} />
              </Suspense>
            </Grid>
          ))}
      </Grid>

      <PaginationComp setPage={setPage} page={page} totalPage={totalPage} />
    </Container>
  );
};

export default TvPage;
