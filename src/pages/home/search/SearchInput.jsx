import React from 'react';
import { Box, Typography } from '@mui/material';
import { useGetDiscoverQuery } from '../../../store/moviesApi';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';

const getRandom = () => {
  const num = Math.floor(Math.random() * 20);
  return num;
};
const SearchInput = () => {
  const { data } = useGetDiscoverQuery();
  // console.log('searchinput', data);

  return (
    <>
      {!!data && (
        <BoxEl
          urlPath={`https://image.tmdb.org/t/p/original/${
            data.results[getRandom()].backdrop_path
          }`}
        >
          <Container className="container">
            <Box mb={4}>
              <Typography variant="h3" sx={{ fontWeight: 600, color: '#fff' }}>
                Welcome.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 500, color: '#fff' }}>
                Millions of movies, TV shows and people to discover. Explore
                now.
              </Typography>
            </Box>
            <InputWrap>
              <input type="text" placeholder="영화,TV프로그램,인물 검색..." />
            </InputWrap>
          </Container>
        </BoxEl>
      )}
    </>
  );
};

export default SearchInput;

const BoxEl = styled(Box)`
  height: 300px;
  background-color: var(--yellow-bg-color);
  position: relative;
  &::before {
    content: '';
    background: ${(props) => `url(${props.urlPath}) no-repeat center center`};
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
const InputWrap = styled.div`
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  padding: 0 15px;
  background-color: #fff;
  box-sizing: border-box;
  input {
    border-radius: 20px;
    width: 100%;
    height: 40px;
    border: none;

    &:focus {
      outline-width: 0;
    }
  }
`;
