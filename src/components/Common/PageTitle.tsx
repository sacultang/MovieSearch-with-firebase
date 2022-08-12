import { ReactElement } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
interface ITitleProps {
  url: string;
}
interface ILaoutProps {
  children: ReactElement | string;
}
const PageTitleLaout = ({ children }: ILaoutProps) => {
  return (
    <Box pt={3} pb={3}>
      <Typography variant="h4" fontWeight={500}>
        {children}
      </Typography>
      <Divider sx={{ mt: 3 }} />
    </Box>
  );
};

const PageTitle = ({ url }: ITitleProps) => {
  switch (url) {
    case '/movie/popular':
      return <PageTitleLaout>인기 영화</PageTitleLaout>;
    case '/movie/now_playing':
      return <PageTitleLaout>현재 상영 영화</PageTitleLaout>;
    case '/movie/upcoming':
      return <PageTitleLaout>개봉 예정 영화</PageTitleLaout>;
    case '/movie/top_rated':
      return <PageTitleLaout>높은 평점 영화</PageTitleLaout>;
    case '/tv/popular':
      return <PageTitleLaout>인기 프로그램</PageTitleLaout>;
    case '/tv/airing_today':
      return <PageTitleLaout>오늘 방영 프로그램</PageTitleLaout>;
    case '/tv/on_the_air':
      return <PageTitleLaout>TV 방영 프로그램</PageTitleLaout>;
    case '/tv/top_rated':
      return <PageTitleLaout>높은 평점 프로그램</PageTitleLaout>;
    case '/favorite':
      return <PageTitleLaout>즐겨찾기 목록</PageTitleLaout>;
    default:
      return <PageTitleLaout>페이지</PageTitleLaout>;
  }
};

export default PageTitle;
