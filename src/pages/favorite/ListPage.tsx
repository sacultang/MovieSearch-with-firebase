import React, { lazy, Suspense } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';
import Loader from '../../components/common/Loader';
import GridItemProvider from '../../components/common/GridItemProvider';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const MovieCard = lazy(() => import('../movies/MovieCard'));

const ListPage = () => {
  const location = useLocation();
  const params = useParams();

  const myList = useSelector((state: RootState) => state.listMovie.list);

  const handleClick = (id: string, type: string) => {
    if (type === 'favorite') return;
  };
  return (
    <Container sx={{ flexGrow: 1, minHeight: 800 }}>
      <PageTitle url={location.pathname} params={params} />
      <Grid container spacing={2}>
        {myList.length > 0 &&
          myList.map(
            (item) =>
              item.id === params.query &&
              item.list.map((list, idx) => (
                <GridItemProvider key={idx}>
                  <Suspense fallback={<Loader />}>
                    <MovieCard movie={list} handleClick={handleClick} />
                  </Suspense>
                </GridItemProvider>
              ))
          )}
      </Grid>
    </Container>
  );
};

export default ListPage;
