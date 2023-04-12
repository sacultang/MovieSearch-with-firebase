import React, { useCallback, useEffect, useState } from 'react';
import { requestData } from '../../../../api/TMDB/request';
import { METHOD_CONS } from '../../../../constants/fetchMethod';
import { IMovieResult } from '../../../../types/movieType';

const useMovieFetch = () => {
  const [value, setValue] = useState(0);
  const [movieAndTvDatas, setMovieAndTvDatas] = useState<IMovieResult[]>([]);

  const popularMovieAndTvFetch = useCallback(async (media_type: string) => {
    try {
      const res = await requestData(`${media_type}/popular`, METHOD_CONS.get);
      const { results }: { results: IMovieResult[] } = res.data;
      const newResults = results.map((item) => {
        return { ...item, media_type };
      });
      setMovieAndTvDatas(newResults);
    } catch (e) {
      throw new Error(`${e}`);
    }
  }, []);

  const handleChangeTap = useCallback(
    async (e: React.SyntheticEvent, newValue: number) => {
      const mediaType = e.currentTarget.id;
      setValue(newValue);
      popularMovieAndTvFetch(mediaType);
    },
    [popularMovieAndTvFetch]
  );

  useEffect(() => {
    popularMovieAndTvFetch('movie');
  }, []);

  return { value, handleChangeTap, movieAndTvDatas };
};

export default useMovieFetch;
