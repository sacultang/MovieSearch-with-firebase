import { useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import PaginationComp from '../../components/common/PaginationComp';
import PageTitle from '../../components/common/PageTitle';
import PageGridItem from '../../components/pageGrid/PageGridItem';
import useFetchHooks from '../hooks/useFetchHooks';
import useHandleNavigate from '../hooks/useHandleNavigate';
import MovieCard from '../movies/MovieCard';
import PageGridContainer from '../../components/pageGrid/PageGridContainer';

const TvPage = () => {
  const { pathname } = useLocation();
  const { totalPage, setPage, page, datas } = useFetchHooks(pathname);
  const handleClickNavigate = useHandleNavigate();

  return (
    <Container sx={{ flexGrow: 1 }}>
      <PageTitle url={pathname} />
      <PageGridContainer>
        {datas.results &&
          datas.results.map((tv) => (
            <PageGridItem key={tv.id}>
              <MovieCard movie={tv} handleClickNavigate={handleClickNavigate} />
            </PageGridItem>
          ))}
      </PageGridContainer>
      <PaginationComp setPage={setPage} page={page} totalPage={totalPage} />
    </Container>
  );
};

export default TvPage;
