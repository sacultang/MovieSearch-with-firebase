import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMovieAction } from '../../store/movieSlice';
import Container from '@mui/material/Container';
import SearchInput from '../home/SearchInput';
import { requestData } from '../../api/TMDB/request';
import { METHOD_CONS } from '../../constants/fetchMethod';
const SearchResults = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const query = params.query;

  const searchFetch = useCallback(async () => {
    try {
      const res = await requestData('search/multi', METHOD_CONS.get, {
        query,
      });
      dispatch(setMovieAction(res.data));
    } catch (e) {
      throw new Error(`${e}`);
    }
  }, [dispatch, query]);
  useEffect(() => {
    searchFetch();
  }, [params, searchFetch]);

  return (
    <Container>
      <SearchInput query={query} border={'main'} />
      <Outlet />
    </Container>
  );
};

export default SearchResults;
