import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSearchData } from '../../../api/TMDB/Popular/getPopularAPI';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMovieAction } from '../../../store/movieSlice';
import { Container } from '@mui/material';
const SearchResults = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const query = params.query;
  const fetch = async () => {
    const res = await getSearchData(query);
    dispatch(setMovieAction(res));
  };
  useEffect(() => {
    fetch();
  }, [params]);

  return (
    <Container>
      SearchResults
      <Outlet />
    </Container>
  );
};

export default SearchResults;
