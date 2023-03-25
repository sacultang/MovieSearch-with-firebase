import { memo } from 'react';

import { useGetDiscoverQuery } from '../../store/moviesApi';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import SearchInput from './SearchInput';
import { IMAGE_PATH } from '../../constants/imagePath';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
const getRandom = () => {
  const num = Math.floor(Math.random() * 20);
  return num;
};
const HomeSearchHeader = () => {
  const { data } = useGetDiscoverQuery(
    '/discover/movie?with_network=123&language=en-US'
  );

  return (
    <>
      {!!data && (
        <BoxEl
          urlpath={`${IMAGE_PATH.w1200}/${
            data.results[getRandom()].backdrop_path
          }`}
        >
          <Container
            className="container"
            sx={{
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'column',
                lg: 'row',
              },
              justifyContent: {
                xs: 'center',
                sm: 'center',
                md: 'center',
              },
            }}
          >
            <Box mb={4}>
              <Typography variant="h3" sx={{ fontWeight: 600, color: '#fff' }}>
                Welcome.
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 500, color: '#fff' }}>
                Millions of movies, TV shows and people to discover. Explore
                now.
              </Typography>
            </Box>
            <SearchInput query={''} border={''} />
          </Container>
        </BoxEl>
      )}
    </>
  );
};

export default memo(HomeSearchHeader);

const BoxEl = styled(Box)<{ urlpath: string }>`
  height: 300px;
  background-color: var(--yellow-bg-color);
  position: relative;
  &::before {
    content: '';
    background: ${({ urlpath }) => `url(${urlpath}) no-repeat top center`};
    background-size: cover;
    opacity: 0.6;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
  .container {
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
  }
`;
