import React, { useState, useCallback, lazy, Suspense } from 'react';
import Tabs from '@mui/material/Tabs/Tabs';
import Tab from '@mui/material/Tab/Tab';
import Typography from '@mui/material/Typography/Typography';
import styled from '@emotion/styled';
import ScrollWrapBox from '../../../components/scrollGrid/ScrollWrapBox';
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
    </Suspense>
  );
};

export default WhatsPopular;
