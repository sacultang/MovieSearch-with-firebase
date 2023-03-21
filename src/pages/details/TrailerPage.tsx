import React, { useState, useEffect, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Container from '@mui/material/Container';
import MovieSkeleton from '../../components/skeleton/MovieSkeleton';
import { requestData } from '../../api/TMDB/request';
import { METHOD_CONS } from '../../constants/fetchMethod';
import { TrailerRoot } from '../../types/trailerType';

interface TrailerPageProps {
  urlPath: string;
}

const TrailerPage = ({ urlPath }: TrailerPageProps) => {
  const [trailers, setTrailers] = useState<TrailerRoot>({ id: 0, results: [] });
  const [loading, setLoading] = useState(false);
  const trailerFetch = useCallback(async () => {
    setLoading(true);
    const url = `${urlPath}/videos`;
    const trailerRes = await requestData(url, METHOD_CONS.get);
    setTrailers(trailerRes.data);
  }, [urlPath]);

  useEffect(() => {
    const fetchTime = setTimeout(async () => {
      await trailerFetch();
      setLoading(false);
    }, 1000);

    return () => {
      trailerFetch();
      clearTimeout(fetchTime);
    };
  }, [urlPath, trailerFetch]);

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
