import { useLocation } from 'react-router-dom';
import PaginationComp from '../../components/common/PaginationComp';
import PageTitle from '../../components/common/PageTitle';
import PageGridItem from '../../components/pageGrid/PageGridItem';
import useFetchHooks from '../hooks/useFetchHooks';
import useHandleNavigate from '../hooks/useHandleNavigate';
import MovieCard from '../movies/MovieCard';
import PageGridContainer from '../../components/pageGrid/PageGridContainer';
import PageContainer from '../../components/pageGrid/PageContainer';
const TvPage = () => {
  const { pathname } = useLocation();
  const { totalPage, setPage, page, datas } = useFetchHooks(pathname);
  const handleClickNavigate = useHandleNavigate();

  return (
    <PageContainer>
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
    </PageContainer>
  );
};

export default TvPage;
