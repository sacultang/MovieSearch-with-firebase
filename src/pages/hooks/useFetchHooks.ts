import { useState, useEffect, useCallback, useRef } from 'react';
import { IMovie, IMovieResult } from '../../types/movieType';
import { requestData } from '../../api/TMDB/request';
import { useNavigate } from 'react-router-dom';
import { METHOD_CONS } from '../../constants/fetchMethod';

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
  const prevUrl = useRef('');

  const getMovieAndTvFetch = useCallback(
    async (page: number) => {
      try {
        const res = await requestData(url, METHOD_CONS.get, { page });
        if (!res.data) {
          navigate('/error', { replace: true });
        }
        const { results }: { results: IMovieResult[] } = res.data;
        const newResults = results.map((item) =>
          item.media_type ? { ...item } : { ...item, media_type: MEDIA_TYPE }
        );
        setDatas({ ...res.data, results: newResults });
        setTotalPage(res.data.total_pages);
      } catch (e) {
        throw new Error(`${e}`);
      }
    },
    [url, navigate, MEDIA_TYPE]
  );
  useEffect(() => {
    if (prevUrl.current !== url) {
      setPage(1);
      getMovieAndTvFetch(1);
    } else if (page !== 1) {
      getMovieAndTvFetch(page);
    }
    prevUrl.current = url;
  }, [url, page, getMovieAndTvFetch, setPage]);

  return { totalPage, setPage, page, datas };
};

export default useFetchHooks;
