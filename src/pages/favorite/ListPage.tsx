import { useLocation, useParams } from 'react-router-dom';
import PageTitle from '../../components/common/PageTitle';
import PageGridItem from '../../components/pageGrid/PageGridItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useHandleNavigate from '../hooks/useHandleNavigate';
import MovieCard from '../movies/MovieCard';
import PageGridContainer from '../../components/pageGrid/PageGridContainer';
import PageContainer from '../../components/pageGrid/PageContainer';

const ListPage = () => {
  const location = useLocation();
  const params = useParams();
  const myList = useSelector((state: RootState) => state.listMovie.list);
  const handleClickNavigate = useHandleNavigate();

  return (
    <PageContainer minHeight={700}>
      <PageTitle url={location.pathname} params={params} />
      <PageGridContainer>
        {myList.length > 0 &&
          myList.map(
            (item) =>
              decodeURIComponent(item.id) === params.query &&
              item.list.map((list, idx) => (
                <PageGridItem key={idx}>
                  <MovieCard
                    movie={list}
                    handleClickNavigate={handleClickNavigate}
                  />
                </PageGridItem>
              ))
          )}
      </PageGridContainer>
    </PageContainer>
  );
};

export default ListPage;
