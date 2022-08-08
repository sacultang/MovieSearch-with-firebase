import React, { useState, useCallback, lazy, Suspense } from 'react';
import { Typography, Tabs, Tab } from '@mui/material';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

const MovieScroll = lazy(() => import('./MovieScroll'));
const TvScroll = lazy(() => import('./TvScroll'));
const TabLayout = lazy(() => import('../common/TabLayout'));
const Loader = lazy(() => import('../../../components/Common/Loader'));

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
        <TitleTypo variant="h5" sx={{ fontWeight: 600 }}>
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
