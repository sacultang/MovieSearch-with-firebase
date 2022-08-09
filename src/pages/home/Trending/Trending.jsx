import React, { useState, useCallback } from 'react';
import { Typography, Tabs, Tab } from '@mui/material';
import Box from '@mui/material/Box';
import TodayTrending from './TodayTrending';
import WeekTrending from './WeekTrending';
import TabLayout from '../common/TabLayout';
import styled from '@emotion/styled';
const TabPannel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const TitleTypo = styled(Typography)`
  &::before {
    content: '';
    border-left: 4px solid var(--yellow-text-color);
    margin-right: 5px;
  }
`;

const Trending = () => {
  const [value, setValue] = useState(0);

  const handleChange = useCallback(async (e, newValue) => {
    setValue(newValue);
  }, []);
  return (
    <TabLayout>
      <TitleTypo variant="h5" sx={{ fontWeight: 600 }}>
        Trending
      </TitleTypo>

      <Tabs value={value} onChange={handleChange}>
        <Tab label="오늘"></Tab>
        <Tab label="이번주"></Tab>
      </Tabs>
      <Box sx={{ overflowX: 'scroll' }}>
        <TabPannel value={value} index={0}>
          <TodayTrending />
        </TabPannel>
        <TabPannel value={value} index={1}>
          <WeekTrending />
        </TabPannel>
      </Box>
    </TabLayout>
  );
};

export default Trending;