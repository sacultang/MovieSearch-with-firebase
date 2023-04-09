import { useLocation } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import PaginationComp from '../../components/common/PaginationComp';
import PageTitle from '../../components/common/PageTitle';
import GridItemProvider from '../../components/common/GridItemProvider';
import useFetchHooks from '../hooks/useFetchHooks';
import useHandleNavigate from '../hooks/useHandleNavigate';
import MovieCard from '../movies/MovieCard';
const TvPage = () => {
  const { pathname } = useLocation();
  const { totalPage, setPage, page, datas } = useFetchHooks(pathname);
  const handleClickNavigate = useHandleNavigate();

  return (
    <Container sx={{ flexGrow: 1 }}>
      <PageTitle url={pathname} />
      <Grid container>
        {datas.results &&
          datas.results.map((tv) => (
            <GridItemProvider key={tv.id}>
              <MovieCard movie={tv} handleClickNavigate={handleClickNavigate} />
            </GridItemProvider>
          ))}
      </Grid>
      <PaginationComp setPage={setPage} page={page} totalPage={totalPage} />
    </Container>
  );
};

export default TvPage;
