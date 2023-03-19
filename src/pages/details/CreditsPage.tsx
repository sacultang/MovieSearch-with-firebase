import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CastType } from '../../types/creditType';
import { requestData } from '../../api/TMDB/baseUrl';
import Skeleton from '@mui/material/Skeleton';
import { METHOD_CONS } from '../../constants/fetchMethod';
interface CreditsPageProps {
  urlPath: string;
}

const CreditsPage = ({ urlPath }: CreditsPageProps) => {
  const [credits, setCredits] = useState<CastType>([]);
  const [imgLoading, setImgLoading] = useState(false);
  function onLoad() {
    setImgLoading(true);
  }
  const fetch = useCallback(async (urlPath: string) => {
    const res = await requestData(`${urlPath}/credits`, METHOD_CONS.get);
    setCredits(res.data.cast);
    setImgLoading(true);
  }, []);
  useEffect(() => {
    fetch(urlPath);
  }, [urlPath, fetch]);

  return (
    <Box
      sx={{
        mt: 3,
      }}
    >
      <Typography variant="h5" fontWeight={500} mb={3}>
        출연진
      </Typography>
      <Box
        sx={{
          overflow: 'scroll',
          mt: 3,
          '&::-webkit-scrollbar': { width: 1, height: 8 },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0,0,0,0.07)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'var( --main-bg-color)',
            borderRadius: '5px',
          },
        }}
      >
        <Grid
          container
          style={{ minHeight: '330px' }}
          direction="row"
          flexWrap="nowrap"
          mt={0}
        >
          {credits.length > 10
            ? credits?.slice(0, 20).map((item) => (
                <Box
                  key={item.name + 1}
                  mr={2}
                  borderRadius={2}
                  minWidth={185}
                  minHeight={276}
                >
                  {!imgLoading ? (
                    <Grid item>
                      <Skeleton height={300} width={200} />
                    </Grid>
                  ) : (
                    <Grid item key={item.name}>
                      {!item.profile_path ? (
                        <Skeleton height={300} width={200} />
                      ) : (
                        <LazyLoadImage
                          src={`https://image.tmdb.org/t/p/w200/${item.profile_path}`}
                          alt={item.name}
                          onLoad={onLoad}
                          width="100%"
                          height="100%"
                          style={{ borderRadius: 20 }}
                        />
                      )}
                      <Typography
                        variant="subtitle1"
                        fontWeight={500}
                        mb={2}
                        mt={2}
                      >
                        {item.name}
                      </Typography>
                    </Grid>
                  )}
                </Box>
              ))
            : credits?.map((item) => (
                <Box
                  key={item.name + 1}
                  mr={2}
                  borderRadius={2}
                  minWidth={180}
                  minHeight={276}
                >
                  {!imgLoading ? (
                    <Grid item>
                      <Skeleton height={300} width={200} />
                    </Grid>
                  ) : (
                    <Grid item key={item.name}>
                      {item.profile_path ? (
                        <LazyLoadImage
                          src={`https://image.tmdb.org/t/p/w200/${item.profile_path}`}
                          alt={item.name}
                          onLoad={onLoad}
                          width="100%"
                          height="100%"
                          style={{ borderRadius: 20 }}
                        />
                      ) : (
                        <Skeleton height={300} width={200} />
                      )}
                      <Typography variant="subtitle1" fontWeight={500}>
                        {item.name}
                      </Typography>
                    </Grid>
                  )}
                </Box>
              ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CreditsPage;
