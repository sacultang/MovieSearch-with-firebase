import { useState, useEffect, useCallback } from 'react';
import { IMovie, IMovieResult } from '../../types/movieType';
import { requestData } from '../../api/TMDB/baseUrl';
import { useNavigate } from 'react-router-dom';
import { METHOD_CONS } from '../../api/TMDB/constant';
const useFetchHooks = (url: string) => {
  const MEDIA_TYPE = url.split('/')[1];
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
      const res = await requestData(url, METHOD_CONS.get, { page });
      if (!res.data) {
        navigate('/error', { replace: true });
      }
      const { results }: { results: IMovieResult[] } = res.data;
      const newResults = results.map((item) => {
        return { ...item, media_type: MEDIA_TYPE };
      });
      setDatas({ ...res.data, results: newResults });
      setTotalPage(res.data.total_pages);
    } catch (e) {
      throw new Error(`${e}`);
    }
  }, [page, navigate, url, MEDIA_TYPE]);

  useEffect(() => {
    fetch();
  }, [url, page, fetch]);
  useEffect(() => {
    setPage(1);
  }, [url]);
  return { totalPage, setPage, page, datas };
};

export default useFetchHooks;
