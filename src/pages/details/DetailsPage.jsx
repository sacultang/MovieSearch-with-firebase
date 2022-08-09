import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMovieDetails } from '../../api/TMDB/Movies/getMovieDetails';
import { getTvDetilas } from '../../api/TMDB/Tv/getTvDetails';
import styled from '@emotion/styled';
import Loader from '../../components/Common/Loader';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
const DetailsPage = () => {
  const { state } = useLocation();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const fetch = async (id, func) => {
    const res = await func(id);
    console.log(res);
    if (!!res) setLoading(false);
    setDetails(res);
  };

  useEffect(() => {
    if (state.type === 'movie') {
      fetch(state.id, getMovieDetails);
    }
    if (state.type === 'tv') {
      fetch(state.id, getTvDetilas);
    }
  }, [state]);
  return (
    <>
      {details?.poster_path && (
        <MainDetailImageBackdrop
          urlPath={`https://image.tmdb.org/t/p/original/${details?.backdrop_path}`}
        >
          <BackDrop>
            <Grid
              container
              p={2}
              sx={{
                flexWrap: {
                  sx: 'wrap',
                  sm: 'wrap',
                  md: 'nowrap',
                  lg: 'nowrap',
                  xl: 'nowrap',
                },
                justifyContent: 'center',
              }}
            >
              <Grid item>
                {loading ? (
                  <Loader />
                ) : (
                  <DetailPosterImg
                    src={`https://image.tmdb.org/t/p/original/${details?.poster_path}`}
                  />
                )}
              </Grid>
              <Grid item ml={2}>
                <Typography variant="h4" fontWeight={600}>
                  {details?.title || details?.name}(
                  {(details?.release_date &&
                    details?.release_date.split('-')[0]) ||
                    (details?.first_air_date &&
                      details?.first_air_date.split('-')[0])}
                  )
                </Typography>
                <Typography>
                  <em style={{ fontWeight: 500 }}>
                    {details?.original_name || details?.original_title}
                  </em>
                  {'∙'}
                  <em style={{ fontWeight: 500 }}>
                    {details?.episode_run_time || details?.runtime}{' '}
                  </em>
                  minutes
                </Typography>
                {details.genres.map((item) => (
                  <SpanTag key={item.id}>{item.name}</SpanTag>
                ))}
                <Typography fontStyle={'italic'} variant="h5" lineHeight={3}>
                  "{details?.tagline && details?.tagline}"
                </Typography>
                <Typography variant="h6">개요</Typography>
                <Typography variant="body" lineHeight={1.3} fontSize={'1rem'}>
                  {details?.overview}
                </Typography>
                <Box mt={3}>
                  <Typography
                    variant="body"
                    fontWeight={600}
                    fontSize={'0.8rem'}
                  >
                    Production Company
                  </Typography>
                  {details?.production_companies.map((item) => (
                    <Box key={item.id} mr={2}>
                      {item.logo_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w200/${item.logo_path}`}
                          alt={item.name}
                          style={{ width: '80px', marginTop: '10px' }}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </BackDrop>
        </MainDetailImageBackdrop>
      )}
    </>
  );
};

export default DetailsPage;

const MainDetailImageBackdrop = styled.div`
  position: relative;

  background: ${(props) => `url(${props.urlPath}) no-repeat center center`};
`;
const BackDrop = styled.div`
  background-image: linear-gradient(
    to right,
    rgb(208 208 208) 150px,
    rgb(135 135 135 / 84%) 100%
  );
`;

const SpanTag = styled.span`
  border: 2px solid var(--orange-border-color);
  color: var(--orange-border-color);
  padding: 2px;
  font-size: 0.8rem;
  margin: 10px 5px;
  margin-left: 0;
  display: inline-block;
`;

const DetailPosterImg = styled.img`
  width: 300px;
  border-radius: 20px;
`;
const ProductionImg = styled.img``;
