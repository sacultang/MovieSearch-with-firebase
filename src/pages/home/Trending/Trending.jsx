import React, { useState, useCallback } from 'react';
import { Typography, Tabs, Tab } from '@mui/material';
import Box from '@mui/material/Box';
import TodayTrending from './TodayTrending';
import WeekTrending from './WeekTrending';
const TabPannel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};
const Trending = () => {
  const [value, setValue] = useState(0);

  const handleChange = useCallback(async (e, newValue) => {
    setValue(newValue);
  }, []);
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Trending
      </Typography>

      <Tabs value={value} onChange={handleChange}>
        <Tab label="오늘" id="movie/popular"></Tab>
        <Tab label="이번주" id="tv/popular"></Tab>
      </Tabs>
      <Box sx={{ overflowX: 'scroll' }}>
        <TabPannel value={value} index={0}>
          <TodayTrending />
        </TabPannel>
        <TabPannel value={value} index={1}>
          <WeekTrending />
        </TabPannel>
      </Box>
    </Box>
  );
};

export default Trending;
