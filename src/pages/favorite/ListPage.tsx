import { useLocation, useParams } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';
import GridItemProvider from '../../components/common/GridItemProvider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useHandleNavigate from '../hooks/useHandleNavigate';
import MovieCard from '../movies/MovieCard';

const ListPage = () => {
  const location = useLocation();
  const params = useParams();
  const myList = useSelector((state: RootState) => state.listMovie.list);
  const handleClickNavigate = useHandleNavigate();

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
                  <MovieCard
                    movie={list}
                    handleClickNavigate={handleClickNavigate}
                  />
                </GridItemProvider>
              ))
          )}
      </Grid>
    </Container>
  );
};

export default ListPage;
