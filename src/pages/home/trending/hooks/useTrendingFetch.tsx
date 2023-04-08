import { useCallback, useEffect, useState } from 'react';
import { requestData } from '../../../../api/TMDB/request';
import { METHOD_CONS } from '../../../../constants/fetchMethod';
import { IMovieResult } from '../../../../types/movieType';

const useTrendingFetch = () => {
  const [value, setValue] = useState<number>(0);
  const [trendingDatas, setTrendingDatas] = useState<IMovieResult[]>([]);

  const trendingTodayFetch = useCallback(async (days: string) => {
    const { data } = await requestData(`trending/all/${days}`, METHOD_CONS.get);
    setTrendingDatas(data.results);
  }, []);

  const handleChangeTap = useCallback(
    async (e: React.SyntheticEvent, newValue: number) => {
      const days = e.currentTarget.id;
      trendingTodayFetch(days);
      setValue(newValue);
    },
    [trendingTodayFetch]
  );

  useEffect(() => {
    trendingTodayFetch('day');
  }, [trendingTodayFetch]);

  return { value, trendingDatas, handleChangeTap };
};

export default useTrendingFetch;