import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TabLayout from '../../../components/scrollGrid/TabLayout';
import ScrollWrapBox from '../../../components/scrollGrid/ScrollWrapBox';
import styled from '@emotion/styled';
import useTrendingFetch from './hooks/useTrendingFetch';
import TrendingScroll from './TrendingScroll';
interface ITabPannel {
  children?: React.ReactNode;
  value: number;
  index: number;
}
const TabPannel = ({ children, value, index }: ITabPannel) => {
  return <>{value === index && <>{children}</>}</>;
};

const Trending = () => {
  const { value, trendingDatas, handleChangeTap } = useTrendingFetch();

  return (
    <TabLayout mainPage={true}>
      <TitleTypo fontSize={'1.2rem'} sx={{ fontWeight: 600 }}>
        Trending
      </TitleTypo>
      <Tabs
        value={value}
        onChange={handleChangeTap}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="trending tabs"
      >
        <Tab label="오늘" id="day"></Tab>
        <Tab label="이번주" id="week"></Tab>
      </Tabs>
      <ScrollWrapBox>
        <TabPannel value={value} index={0}>
          <TrendingScroll trendingDatas={trendingDatas} />
        </TabPannel>
        <TabPannel value={value} index={1}>
          <TrendingScroll trendingDatas={trendingDatas} />
        </TabPannel>
      </ScrollWrapBox>
    </TabLayout>
  );
};

export default Trending;

const TitleTypo = styled(Typography)`
  &::before {
    content: '';
    border-left: 4px solid var(--yellow-text-color);
    margin-right: 5px;
  }
`;
