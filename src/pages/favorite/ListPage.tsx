import React, { lazy, Suspense } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PageTitle from '../../components/Common/PageTitle';
import Loader from '../../components/Common/Loader';

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
    // {
    //   movieDatas.forEach((item: any) =>
    //     item.first_air_date ? (path = 'tv') : (path = 'movie')
    //   );
    // }

    // navigate(`/details/${path}/${id}`, { state: { type, id } });
  };
  return (
    <Container sx={{ flexGrow: 1 }}>
      <PageTitle url={location.pathname} params={params} />
      <Grid container spacing={2}>
        {myList.length > 0 &&
          myList.map(
            (item) =>
              item.id === params.query &&
              item.list.map((list, idx) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={3}
                  key={idx}
                  position="relative"
                >
                  <Suspense fallback={<Loader />}>
                    <MovieCard movie={list} handleClick={handleClick} />
                  </Suspense>
                </Grid>
              ))
          )}
      </Grid>
    </Container>
  );
};

export default ListPage;
