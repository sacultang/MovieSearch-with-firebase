import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMovieAction } from '../../store/movieSlice';
import { Container } from '@mui/material';
import SearchInput from '../home/SearchInput';
import { requestData } from '../../api/TMDB/baseUrl';
const SearchResults = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const query = params.query;

  const fetch = useCallback(async () => {
    const url = 'search/multi';
    const params = { query };
    const res = await requestData(url, 'GET', params);
    dispatch(setMovieAction(res));
  }, [dispatch, query]);
  useEffect(() => {
    fetch();
  }, [params, fetch]);

  return (
    <Container>
      <SearchInput query={query} border={'main'} />
      <Outlet />
    </Container>
  );
};

export default SearchResults;
