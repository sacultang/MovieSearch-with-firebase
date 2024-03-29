import { useEffect, useCallback, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { requestData } from '../../api/TMDB/request';
import { METHOD_CONS } from '../../constants/fetchMethod';
import PageTitle from '../../components/common/PageTitle';
import PaginationComp from '../../components/common/PaginationComp';
import PageContainer from '../../components/pageGrid/PageContainer';
import { IMovie } from '../../types/movieType';
const SearchMain = () => {
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState<IMovie>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const params = useParams();
  const query = params.query;
  const { pathname } = useLocation();

  const searchFetch = useCallback(async () => {
    try {
      const res = await requestData('search/multi', METHOD_CONS.get, {
        query,
        page,
      });
      setSearchResults(res.data);
    } catch (e) {
      throw new Error(`${e}`);
    }
  }, [page, query]);

  useEffect(() => {
    searchFetch();
  }, [query, searchFetch, page]);

  return (
    <PageContainer>
      <PageTitle url={pathname} params={params} />
      <Outlet context={{ searchResults }} />
      <PaginationComp
        totalPage={searchResults.total_pages}
        setPage={setPage}
        page={page}
      />
    </PageContainer>
  );
};

export default SearchMain;
