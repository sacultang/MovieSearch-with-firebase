import React, { lazy, Suspense } from 'react';
// import WhatsPopular from './popular/WhatsPopular';
import SearchInput from './search/SearchInput';
// import Trending from './Trending/Trending';
import { Container } from '@mui/material';
import { useGetMovieQuery } from '../../store/moviesApi';
import Loader from '../../components/Common/Loader';
import FullSearchLayout from './search/FullSearchLayout';
const WhatsPopular = lazy(() => import('./popular/WhatsPopular'));
const Trending = lazy(() => import('./Trending/Trending'));
const Home = () => {
  return (
    <>
      <FullSearchLayout />
      <Container>
        <Suspense fallback={<Loader />}>
          <WhatsPopular />
          <Trending />
        </Suspense>
      </Container>
    </>
  );
};

export default Home;
