import React, { lazy, Suspense } from 'react';

import Loader from '../../components/common/Loader';
import HomeSearchHeader from './HomeSearchHeader';
const WhatsPopular = lazy(() => import('./popular/WhatsPopular'));
const Trending = lazy(() => import('./trending/Trending'));
const Home = () => {
  return (
    <>
      <HomeSearchHeader />
      <Suspense fallback={<Loader />}>
        <WhatsPopular />
        <Trending />
      </Suspense>
    </>
  );
};

export default Home;
