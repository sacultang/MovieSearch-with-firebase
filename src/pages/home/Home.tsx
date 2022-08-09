import React, { lazy, Suspense } from 'react';

import { Box } from '@mui/material';
import Loader from '../../components/Common/Loader';
import Header from './Header';
const WhatsPopular = lazy(() => import('./popular/WhatsPopular'));
const Trending = lazy(() => import('./Trending/Trending'));
const Home = () => {
  return (
    <>
      <Box>
        <Header />
        <Suspense fallback={<Loader />}>
          <WhatsPopular />
          <Trending />
        </Suspense>
      </Box>
    </>
  );
};

export default Home;
