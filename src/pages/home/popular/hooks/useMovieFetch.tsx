import React, { useCallback, useEffect, useState } from 'react';
import { requestData } from '../../../../api/TMDB/request';
import { METHOD_CONS } from '../../../../constants/fetchMethod';
import { IMovieResult } from '../../../../types/movieType';

const useMovieFetch = () => {
  const [value, setValue] = useState(0);
  const [movieDatas, setMovieDatas] = useState<IMovieResult[]>([]);

  const popularMovieFetch = useCallback(async (media_type: string) => {
    const res = await requestData(`${media_type}/popular`, METHOD_CONS.get);
    const { results }: { results: IMovieResult[] } = res.data;
    const newResults = results.map((item) => {
      return { ...item, media_type };
    });
    setMovieDatas(newResults);
  }, []);

  const handleChange = useCallback(
    async (e: React.SyntheticEvent, newValue: number) => {
      const mediaType = e.currentTarget.id;
      setValue(newValue);
      popularMovieFetch(mediaType);
    },
    [popularMovieFetch]
  );

  useEffect(() => {
    popularMovieFetch('movie');
  }, [popularMovieFetch]);

  return { value, handleChange, movieDatas };
};

export default useMovieFetch;
