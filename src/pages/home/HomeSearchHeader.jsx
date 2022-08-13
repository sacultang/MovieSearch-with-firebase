import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { useGetDiscoverQuery } from '../../store/moviesApi';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

const getRandom = () => {
  const num = Math.floor(Math.random() * 20);
  return num;
};
const HomeSearchHeader = () => {
  const { data } = useGetDiscoverQuery();
  const navigate = useNavigate();

  const getMovieList = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const search = data.get('search');
    if (search === null || search === undefined || search === '') return;
    else {
      navigate(`/search/${search}`);
    }
  };

  return (
    <>
      {!!data && (
        <BoxEl
          urlPath={`https://image.tmdb.org/t/p/original/${
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
              <Typography variant="h5" sx={{ fontWeight: 500, color: '#fff' }}>
                Millions of movies, TV shows and people to discover. Explore
                now.
              </Typography>
            </Box>
            <InputWrap onSubmit={getMovieList}>
              <input
                type="text"
                placeholder="영화,TV프로그램,인물 검색..."
                name="search"
              />
              <button>검색</button>
            </InputWrap>
          </Container>
        </BoxEl>
      )}
    </>
  );
};

export default memo(HomeSearchHeader);

const BoxEl = styled(Box)`
  height: 300px;
  background-color: var(--yellow-bg-color);
  position: relative;
  &::before {
    content: '';
    background: ${(props) => `url(${props.urlPath}) no-repeat top center`};
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
const InputWrap = styled.form`
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  width: 100%;

  background-color: #fff;
  box-sizing: border-box;
  input {
    border-radius: 20px;
    flex: 1;
    height: 40px;
    border: none;
    margin-left: 10px;
    &:focus {
      outline-width: 0;
    }
  }
  button {
    width: 100px;
    background: var(--main-bg-color);

    border: 5px solid var(--main-bg-color);
    /* border-radius: 20px; */
    color: #fff;
  }
`;
