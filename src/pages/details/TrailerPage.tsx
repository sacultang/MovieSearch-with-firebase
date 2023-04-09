import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Container from '@mui/material/Container';
import { TrailerResult } from '../../types/trailerType';

interface TrailerPageProps {
  trailers: TrailerResult[];
}

const TrailerPage = ({ trailers }: TrailerPageProps) => {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      slidesPerView={1}
      spaceBetween={50}
    >
      {trailers
        ? trailers.map((item) => (
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
                  <iframe
                    width="100%"
                    height="100%"
                    title={item.name}
                    src={`https://youtube.com/embed/${item.key}`}
                  />
                </Container>
              </Box>
            </SwiperSlide>
          ))
        : null}
    </Swiper>
  );
};

export default TrailerPage;
