import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography/';
import styled from '@emotion/styled';
import ScrollWrapBox from '../../../components/scrollGrid/ScrollWrapBox';
import TabLayout from '../common/TabLayout';
import ScrollComponent from './ScrollComponent';
import useMovieFetch from './hooks/useMovieFetch';

interface ITabPannel {
  children?: React.ReactElement;
  value: number;
  index: number;
}
const TabPannel = ({ children, value, index }: ITabPannel) => {
  return <>{value === index && <>{children}</>}</>;
};

const WhatsPopular = () => {
  const { value, handleChangeTap, movieAndTvDatas } = useMovieFetch();

  return (
    <TabLayout>
      <TitleTypo fontSize={'1.2rem'} sx={{ fontWeight: 600 }}>
        WhatsPopular
      </TitleTypo>
      <Tabs value={value} onChange={handleChangeTap}>
        <Tab label="영화" id="movie" />
        <Tab label="TV" id="tv" />
      </Tabs>
      <ScrollWrapBox>
        <TabPannel value={value} index={0}>
          <ScrollComponent movieAndTvDatas={movieAndTvDatas} />
        </TabPannel>
        <TabPannel value={value} index={1}>
          <ScrollComponent movieAndTvDatas={movieAndTvDatas} />
        </TabPannel>
      </ScrollWrapBox>
    </TabLayout>
  );
};

export default WhatsPopular;

const TitleTypo = styled(Typography)`
  &::before {
    content: '';
    border-left: 4px solid var(--yellow-text-color);
    margin-right: 5px;
  }
`;
