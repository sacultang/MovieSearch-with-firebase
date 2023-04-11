import { useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import PaginationComp from '../../components/common/PaginationComp';
import PageTitle from '../../components/common/PageTitle';
import useFetchHooks from '../hooks/useFetchHooks';
import PageGridItem from '../../components/pageGrid/PageGridItem';
import useHandleNavigate from '../hooks/useHandleNavigate';
import MovieCard from './MovieCard';

const MoviePage = () => {
  const { pathname } = useLocation();
  const { totalPage, setPage, page, datas } = useFetchHooks(pathname);
  const handleClickNavigate = useHandleNavigate();

  return (
    <Container sx={{ flexGrow: 1 }}>
      <PageTitle url={pathname} />
      <Grid container>
        {datas.results &&
          datas.results.map((movie) => (
            <PageGridItem key={movie.id}>
              <MovieCard
                movie={movie}
                handleClickNavigate={handleClickNavigate}
              />
            </PageGridItem>
          ))}
      </Grid>

      <PaginationComp setPage={setPage} page={page} totalPage={totalPage} />
    </Container>
  );
};

export default MoviePage;
