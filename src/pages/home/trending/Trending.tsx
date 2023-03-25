import React, { useState, useCallback } from 'react';
import Tabs from '@mui/material/Tabs/Tabs';
import Tab from '@mui/material/Tab/Tab';
import Typography from '@mui/material/Typography';
import TodayTrendingScroll from './TodayTrendingScroll';
import WeekTrendingScroll from './WeekTrendingScroll';
import TabLayout from '../common/TabLayout';
import ScrollWrapBox from '../../../components/scrollGrid/ScrollWrapBox';
import styled from '@emotion/styled';
interface ITabPannel {
  children?: React.ReactElement;
  value: number;
  index: number;
}
const TabPannel = ({ children, value, index }: ITabPannel) => {
  return <>{value === index && <>{children}</>}</>;
};

const TitleTypo = styled(Typography)`
  &::before {
    content: '';
    border-left: 4px solid var(--yellow-text-color);
    margin-right: 5px;
  }
`;

const Trending = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = useCallback(
    async (e: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    },
    []
  );
  return (
    <TabLayout>
      <TitleTypo fontSize={'1.2rem'} sx={{ fontWeight: 600 }}>
        Trending
      </TitleTypo>

      <Tabs value={value} onChange={handleChange}>
        <Tab label="오늘"></Tab>
        <Tab label="이번주"></Tab>
      </Tabs>
      <ScrollWrapBox>
        <TabPannel value={value} index={0}>
          <TodayTrendingScroll />
        </TabPannel>
        <TabPannel value={value} index={1}>
          <WeekTrendingScroll />
        </TabPannel>
      </ScrollWrapBox>
    </TabLayout>
  );
};

export default Trending;
