import React, { useState, useCallback } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography/';
import styled from '@emotion/styled';
import ScrollWrapBox from '../../../components/scrollGrid/ScrollWrapBox';
import TabLayout from '../common/TabLayout';
import MovieScroll from './MovieScroll';
import TvScroll from './TvScroll';

interface ITabPannel {
  children?: React.ReactElement;
  value: number;
  index: number;
}
const TabPannel = ({ children, value, index }: ITabPannel) => {
  return <>{value === index && <>{children}</>}</>;
};

const WhatsPopular = () => {
  const [value, setValue] = useState(0);

  const handleChange = useCallback(
    async (e: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    },
    []
  );

  const TitleTypo = styled(Typography)`
    &::before {
      content: '';
      border-left: 4px solid var(--yellow-text-color);
      margin-right: 5px;
    }
  `;

  return (
    <TabLayout>
      <TitleTypo fontSize={'1.2rem'} sx={{ fontWeight: 600 }}>
        WhatsPopular
      </TitleTypo>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="영화"></Tab>
        <Tab label="TV"></Tab>
      </Tabs>
      <ScrollWrapBox>
        <TabPannel value={value} index={0}>
          <MovieScroll />
        </TabPannel>
        <TabPannel value={value} index={1}>
          <TvScroll />
        </TabPannel>
      </ScrollWrapBox>
    </TabLayout>
  );
};

export default WhatsPopular;
