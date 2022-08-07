import React, { useState, useCallback, useEffect } from 'react';
import { Typography, Tabs, Tab } from '@mui/material';
import Box from '@mui/material/Box';
import MovieCard from '../../movies/MovieCard';
import { request } from '../../../api/TMDB/baseUrl';
import MoviePage from '../../movies/MoviePage';
import MovieScroll from './MovieScroll';
import TvScroll from './TvScroll';
const TabPannel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const WhatsPopular = () => {
  const [value, setValue] = useState(0);

  const handleChange = useCallback(async (e, newValue) => {
    setValue(newValue);
  }, []);
  return (
    <Box>
      <Typography variant="h5">WhatsPopular</Typography>

      <Tabs value={value} onChange={handleChange}>
        <Tab label="영화" id="movie/popular"></Tab>
        <Tab label="TV" id="tv/popular"></Tab>
      </Tabs>
      <Box sx={{ overflowX: 'scroll' }}>
        <TabPannel value={value} index={0}>
          <MovieScroll />
        </TabPannel>
        <TabPannel value={value} index={1}>
          <TvScroll />
        </TabPannel>
      </Box>
    </Box>
  );
};

export default WhatsPopular;
