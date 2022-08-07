import React from 'react';
import WhatsPopular from './popular/WhatsPopular';
import FreeToWatch from './freeToWatch/FreeToWatch';
import Trending from './Trending/Trending';
import { Container } from '@mui/material';
const Home = () => {
  return (
    <Container>
      <WhatsPopular />
      <Trending />
    </Container>
  );
};

export default Home;
