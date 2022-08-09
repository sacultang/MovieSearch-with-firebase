import React, { useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getSearchData } from '../../api/TMDB/Search/getSearchAPI';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMovieAction } from '../../store/movieSlice';
import { Container, Box } from '@mui/material';

const SearchResults = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const query = params.query;
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const fetch = useCallback(async () => {
    const res = await getSearchData(query);
    dispatch(setMovieAction(res));
  }, [dispatch, query]);
  useEffect(() => {
    fetch();
  }, [params]);
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const search = data.get('search');
      if (search === '' || search === null || search === undefined) return;
      navigate(`/search/${search}`);
    },
    [navigate]
  );
  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit}>
        <input placeholder={`${query}`} ref={inputRef} name="search" />
      </Box>
      <Outlet />
    </Container>
  );
};

export default SearchResults;
