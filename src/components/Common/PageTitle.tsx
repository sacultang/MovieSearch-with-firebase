import React from 'react';
import Typography from '@mui/material/Typography';
interface ITitleProps {
  url: string;
}
const PageTitle = ({ url }: ITitleProps) => {
  switch (url) {
    case '/movie/popular':
      return (
        <Typography variant="h4" fontWeight={500}>
          인기 영화
        </Typography>
      );
    case '/movie/now_playing':
      return (
        <Typography variant="h4" fontWeight={500}>
          현재 상영 영화
        </Typography>
      );
    case '/movie/upcoming':
      return (
        <Typography variant="h4" fontWeight={500}>
          개봉 예정 영화
        </Typography>
      );
    case '/movie/top_rated':
      return (
        <Typography variant="h4" fontWeight={500}>
          높은 평점 영화
        </Typography>
      );

    case '/tv/popular':
      return (
        <Typography variant="h4" fontWeight={500}>
          인기 프로그램
        </Typography>
      );
    case '/tv/airing_today':
      return (
        <Typography variant="h4" fontWeight={500}>
          오늘 방영 프로그램
        </Typography>
      );
    case '/tv/on_the_air':
      return (
        <Typography variant="h4" fontWeight={500}>
          TV 방영 프로그램
        </Typography>
      );
    case '/tv/top_rated':
      return (
        <Typography variant="h4" fontWeight={500}>
          높은 평점 프로그램
        </Typography>
      );

    default:
      return (
        <Typography variant="h4" fontWeight={500}>
          페이지
        </Typography>
      );
  }
};

export default PageTitle;
