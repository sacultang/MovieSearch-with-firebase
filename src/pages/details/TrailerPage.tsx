import React, { useState, useEffect, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getTrailer } from '../../api/TMDB/Details/getDetails';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Container from '@mui/material/Container';
import MovieSkeleton from '../../components/Skeleton/MovieSkeleton';

interface IProps {
  urlPath: string;
}
interface Root {
  id: number;
  results: Result[];
}

interface Result {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
const TrailerPage = ({ urlPath }: IProps) => {
  const [trailers, setTrailers] = useState<Root>({ id: 0, results: [] });
  const [loading, setLoading] = useState(false);
  const fetch = useCallback(async () => {
    setLoading(true);
    const trailerRes = await getTrailer(urlPath);
    setTrailers(trailerRes);
  }, [urlPath]);

  useEffect(() => {
    const fetchTime = setTimeout(async () => {
      await fetch();
      setLoading(false);
    }, 1000);

    return () => {
      fetch();
      clearTimeout(fetchTime);
    };
  }, [urlPath, fetch]);

  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      slidesPerView={1}
      spaceBetween={50}
    >
      {trailers.results
        ? trailers.results.map((item) => (
            <SwiperSlide key={item.key}>
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" fontWeight={500}>
                  {item.name}
                </Typography>
                <Container
                  sx={{
                    p: 4,
                    height: { xs: 400, sm: 400, md: 600, lg: 600, xl: 600 },
                  }}
                >
                  {loading ? (
                    <MovieSkeleton />
                  ) : (
                    <iframe
                      src={`https://youtube.com/embed/${item.key}`}
                      frameBorder="0"
                      title={item.name}
                      width="100%"
                      height="100%"
                    />
                  )}
                </Container>
              </Box>
            </SwiperSlide>
          ))
        : null}
    </Swiper>
  );
};

export default TrailerPage;
