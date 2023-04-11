import { useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';

import PaginationComp from '../../components/common/PaginationComp';
import PageTitle from '../../components/common/PageTitle';
import useFetchHooks from '../hooks/useFetchHooks';
import PageGridItem from '../../components/pageGrid/PageGridItem';
import useHandleNavigate from '../hooks/useHandleNavigate';
import MovieCard from './MovieCard';
import PageGridContainer from '../../components/pageGrid/PageGridContainer';

const MoviePage = () => {
  const { pathname } = useLocation();
  const { totalPage, setPage, page, datas } = useFetchHooks(pathname);
  const handleClickNavigate = useHandleNavigate();

  return (
    <Container sx={{ flexGrow: 1 }}>
      <PageTitle url={pathname} />
      <PageGridContainer>
        {datas.results &&
          datas.results.map((movie) => (
            <PageGridItem key={movie.id}>
              <MovieCard
                movie={movie}
                handleClickNavigate={handleClickNavigate}
              />
            </PageGridItem>
          ))}
      </PageGridContainer>

      <PaginationComp setPage={setPage} page={page} totalPage={totalPage} />
    </Container>
  );
};

export default MoviePage;
