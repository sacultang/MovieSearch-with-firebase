import React, { lazy, useEffect, useState, Suspense, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Loader from '../../components/common/Loader';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DetailPosterSkeleton from '../../components/skeleton/DetailPosterSkeleton';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { requestData } from '../../api/TMDB/baseUrl';
import { METHOD_CONS } from '../../api/TMDB/constant';
import { MediaDetailsType } from '../../types/mediaType';
const CreditsPage = lazy(() => import('./CreditsPage'));
const TrailerPage = lazy(() => import('./TrailerPage'));
const SimilarPage = lazy(() => import('./SimilarPage'));
interface CustomizedState {
  id: number | string;
  type: string;
}
const DetailsPage = () => {
  const { pathname, state } = useLocation();
  const myState = state as CustomizedState;
  const urlPath = pathname.split('/').slice(2, 4).join('/');
  const navigate = useNavigate();
  const [details, setDetails] = useState<MediaDetailsType>();
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(
    async (id: number | string, type: string) => {
      setLoading(true);
      try {
        const detailRes = await requestData(`${type}/${id}`, METHOD_CONS.get);
        if (!detailRes.data) {
          navigate('/error');
        }

        setDetails(detailRes.data);
      } catch (e) {
        throw new Error(`${e}`);
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (state === undefined || state === null) {
      navigate('/error');
    } else {
      fetch(myState.id, myState?.type);
    }
  }, [navigate, state, fetch, myState]);

  if (loading) {
    return <Loader />;
  }
  return (
    <Box component="section">
      {details?.poster_path && (
        <MainDetailImageBackdrop
          imgPath={`https://image.tmdb.org/t/p/original/${details?.backdrop_path}`}
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
                  <DetailPosterSkeleton />
                ) : (
                  <LazyLoadImage
                    src={`https://image.tmdb.org/t/p/w300/${details?.poster_path}`}
                    width={'300px'}
                    alt={details?.title || details?.name}
                    style={{
                      borderRadius: '20px',
                    }}
                  />
                )}
              </Grid>
              <Grid item ml={2} maxWidth={1200}>
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
                <Typography variant="h6" fontWeight={600} fontSize={'0.9rem'}>
                  개요
                </Typography>
                <Typography
                  variant="body1"
                  lineHeight={1.3}
                  fontSize={'1rem'}
                  mt={1}
                  display={'inline-block'}
                >
                  {details?.overview}
                </Typography>
                <Box mt={3}>
                  <Typography variant="h6" fontWeight={600} fontSize={'0.8rem'}>
                    Production Company
                  </Typography>
                  <Box display={'flex'} alignItems={'center'}>
                    {details?.production_companies.map((item, idx) => (
                      <div key={item.id || idx}>
                        {item.logo_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w200/${item.logo_path}`}
                            alt={item.name}
                            style={{
                              width: '60px',
                              marginTop: '10px',
                              marginRight: '10px',
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Suspense fallback={<Loader />}>
              <TrailerPage urlPath={urlPath} />
            </Suspense>
          </BackDrop>
        </MainDetailImageBackdrop>
      )}
      <Suspense fallback={<Loader />}>
        <CreditsPage urlPath={urlPath} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <SimilarPage urlPath={urlPath} />
      </Suspense>
    </Box>
  );
};

export default DetailsPage;

const MainDetailImageBackdrop = styled.div<{ imgPath: string }>`
  position: relative;
  background: ${(props) => `url(${props.imgPath}) no-repeat top center`};
  background-size: cover;
`;
const BackDrop = styled.div`
  padding: 40px;
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
