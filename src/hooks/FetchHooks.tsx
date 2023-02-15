import { useState, useEffect, useCallback } from 'react';
import { IMovie } from '../types/movieType';
import { getData } from '../api/TMDB/Movies/getMovieAPI';
import { useNavigate } from 'react-router-dom';
const FetchHooks = (url: string) => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState<IMovie>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetch = useCallback(async () => {
    try {
      const res = await getData(url, page);
      if (res === undefined || res === null) {
        navigate('/error', { replace: true });
      }
      setDatas(res);
      setTotalPage(res.total_pages);
    } catch (e) {
      console.log(e);
    } finally {
    }
  }, [page, navigate, url]);

  useEffect(() => {
    fetch();
  }, [url, page, fetch]);
  useEffect(() => {
    setPage(1);
  }, [url]);
  return { totalPage, setPage, page, datas };
};

export default FetchHooks;
