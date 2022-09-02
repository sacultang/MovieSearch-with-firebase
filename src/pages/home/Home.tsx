import React, { lazy, Suspense } from 'react';

import { Box } from '@mui/material';
import Loader from '../../components/common/Loader';
import HomeSearchHeader from './HomeSearchHeader';
const WhatsPopular = lazy(() => import('./popular/WhatsPopular'));
const Trending = lazy(() => import('./Trending/Trending'));
const Home = () => {
  return (
    <>
      <Box>
        <HomeSearchHeader />
        <Suspense fallback={<Loader />}>
          <WhatsPopular />
          <Trending />
        </Suspense>
      </Box>
    </>
  );
};

export default Home;
