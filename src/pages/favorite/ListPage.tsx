import React, { lazy, Suspense } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';
import Loader from '../../components/common/Loader';
import GridItemProvider from '../../components/common/GridItemProvider';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { HandleClickNaviType } from '../../types/handleClickNaviType';
const MovieCard = lazy(() => import('../movies/MovieCard'));

const ListPage = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const myList = useSelector((state: RootState) => state.listMovie.list);
  const handleClick: HandleClickNaviType = (id, type) => {
    navigate(`/details/${type}/${id}`, { state: { type, id } });
  };

  return (
    <Container sx={{ flexGrow: 1, minHeight: 800 }}>
      <PageTitle url={location.pathname} params={params} />
      <Grid container>
        {myList.length > 0 &&
          myList.map(
            (item) =>
              decodeURIComponent(item.id) === params.query &&
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
