import React, { useState, useCallback, lazy, Suspense } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

const MovieScroll = lazy(() => import('./MovieScroll'));
const TvScroll = lazy(() => import('./TvScroll'));
const TabLayout = lazy(() => import('../common/TabLayout'));
const Loader = lazy(() => import('../../../components/Common/Loader'));
interface ITabPannel {
  children?: React.ReactElement;
  value: number;
  index: number;
}
const TabPannel = ({ children, value, index }: ITabPannel) => {
  return (
    <Box hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </Box>
  );
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
        <TitleTypo
          variant="subtitle1"
          fontSize={'1.2rem'}
          sx={{ fontWeight: 600 }}
        >
          WhatsPopular
        </TitleTypo>

        <Tabs value={value} onChange={handleChange}>
          <Tab label="영화"></Tab>
          <Tab label="TV"></Tab>
        </Tabs>
        <Box sx={{ overflowX: 'scroll' }}>
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
