import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { Params } from 'react-router-dom';
interface ITitleProps {
  url: string;
  params?: Readonly<Params<string>>;
}
interface ILaoutProps {
  children: React.ReactNode;
}
const PageTitleLayout = ({ children }: ILaoutProps) => {
  return (
    <Box pb={3}>
      <Typography variant="h4" fontWeight={500}>
        {children}
      </Typography>
      <Divider sx={{ mt: 3 }} />
    </Box>
  );
};

const PageTitle = ({ url, params }: ITitleProps) => {
  switch (decodeURIComponent(url)) {
    case '/movie/popular':
      return <PageTitleLayout>인기 영화</PageTitleLayout>;
    case '/movie/now_playing':
      return <PageTitleLayout>현재 상영 영화</PageTitleLayout>;
    case '/movie/upcoming':
      return <PageTitleLayout>개봉 예정 영화</PageTitleLayout>;
    case '/movie/top_rated':
      return <PageTitleLayout>높은 평점 영화</PageTitleLayout>;
    case '/tv/popular':
      return <PageTitleLayout>인기 프로그램</PageTitleLayout>;
    case '/tv/airing_today':
      return <PageTitleLayout>오늘 방영 프로그램</PageTitleLayout>;
    case '/tv/on_the_air':
      return <PageTitleLayout>TV 방영 프로그램</PageTitleLayout>;
    case '/tv/top_rated':
      return <PageTitleLayout>높은 평점 프로그램</PageTitleLayout>;
    case '/favorite':
      return <PageTitleLayout>즐겨찾기 목록</PageTitleLayout>;
    case `/list/${params?.query as string}`:
      return <PageTitleLayout>{params?.query as string}</PageTitleLayout>;
    case `/search/${params?.query as string}`:
      return (
        <PageTitleLayout>{params?.query as string}의 검색 결과</PageTitleLayout>
      );

    default:
      return <PageTitleLayout>페이지</PageTitleLayout>;
  }
};

export default PageTitle;
