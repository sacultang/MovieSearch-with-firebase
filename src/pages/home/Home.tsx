import React from 'react';

import HomeSearchHeader from './HomeSearchHeader';
import WhatsPopular from './popular/WhatsPopular';
import Trending from './trending/Trending';
const Home = () => {
  return (
    <>
      <HomeSearchHeader />
      <WhatsPopular />
      <Trending />
    </>
  );
};

export default Home;
