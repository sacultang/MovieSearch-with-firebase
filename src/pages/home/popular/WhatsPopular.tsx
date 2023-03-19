import React, { useState, useCallback, lazy, Suspense } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

const MovieScroll = lazy(() => import('./MovieScroll'));
const TvScroll = lazy(() => import('./TvScroll'));
const TabLayout = lazy(() => import('../common/TabLayout'));
const Loader = lazy(() => import('../../../components/common/Loader'));
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
    <Suspense fallback={<Loader />}>
      <TabLayout>
        <TitleTypo fontSize={'1.2rem'} sx={{ fontWeight: 600 }}>
          잘되나?
        </TitleTypo>

        <Tabs value={value} onChange={handleChange}>
          <Tab label="영화"></Tab>
          <Tab label="TV"></Tab>
        </Tabs>
        <Box
          sx={{
            overflowX: 'scroll',
            '&::-webkit-scrollbar': { width: 1, height: 8 },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'rgba(0,0,0,0.07)',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'var( --main-bg-color)',
              borderRadius: '5px',
            },
          }}
        >
          <TabPannel value={value} index={0}>
            <MovieScroll />
          </TabPannel>
          <TabPannel value={value} index={1}>
            <TvScroll />
          </TabPannel>
        </Box>
      </TabLayout>
    </Suspense>
  );
};

export default WhatsPopular;
