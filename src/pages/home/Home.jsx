import React, { lazy, Suspense } from 'react';

import { Box } from '@mui/material';
import Loader from '../../components/Common/Loader';
import FullSearchLayout from './search/FullSearchLayout';
const WhatsPopular = lazy(() => import('./popular/WhatsPopular'));
const Trending = lazy(() => import('./Trending/Trending'));
const Home = () => {
  return (
    <>
      <FullSearchLayout />
      <Box>
        <Suspense fallback={<Loader />}>
          <WhatsPopular />
          <Trending />
        </Suspense>
      </Box>
    </>
  );
};

export default Home;
