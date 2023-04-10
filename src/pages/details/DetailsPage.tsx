import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import Loader from '../../components/common/Loader';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { IMAGE_PATH } from '../../constants/imagePath';
import TrailerPage from './TrailerPage';
import CreditsPage from './CreditsPage';
import SimilarPage from './SimilarPage';
import useDeatilsFetch from './hooks/useDeatilsFetch';

const DetailsPage = () => {
  const { pathname } = useLocation();
  const urlPath = pathname.replace('/details', '');
  const { similarData, trailers, credits, details, loading } =
    useDeatilsFetch(urlPath);

  if (loading) {
    return <Loader />;
  }
  return (
    <Box component="section">
      {details?.poster_path && (
        <MainDetailImageBackdrop
          imgPath={`${IMAGE_PATH.original}/${details?.backdrop_path}`}
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
                <img
                  src={`${IMAGE_PATH.w300}/${details?.poster_path}`}
                  width={'300px'}
                  alt={details?.title || details?.name}
                  style={{
                    borderRadius: '20px',
                  }}
                />
              </Grid>
              <Grid item ml={2} maxWidth={1200}>
                <Typography variant="h4" fontWeight={600}>
                  {details?.title ?? details?.name} (
                  {
                    (details?.release_date ?? details?.first_air_date)?.split(
                      '-'
                    )[0]
                  }
                  )
                </Typography>
                <Typography>
                  <em style={{ fontWeight: 500 }}>
                    {details?.original_name || details?.original_title}
                  </em>
                  {'  '}
                  <em style={{ fontWeight: 500 }}>
                    {details?.episode_run_time || details?.runtime}
                  </em>
                  minutes
                </Typography>
                {details.genres.map((item) => (
                  <GenereSpanTag key={item.id}>{item.name}</GenereSpanTag>
                ))}
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
                            src={`${IMAGE_PATH.w200}/${item.logo_path}`}
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
            <TrailerPage trailers={trailers} />
          </BackDrop>
        </MainDetailImageBackdrop>
      )}
      <CreditsPage credits={credits} />
      <SimilarPage similarData={similarData} />
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

const GenereSpanTag = styled.span`
  border: 2px solid var(--orange-border-color);
  color: var(--orange-border-color);
  padding: 2px;
  font-size: 0.8rem;
  margin: 10px 5px;
  margin-left: 0;
  display: inline-block;
  cursor: default;
`;
