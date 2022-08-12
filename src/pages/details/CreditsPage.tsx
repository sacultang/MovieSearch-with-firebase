import React, { useEffect, useState } from 'react';
import { getCredit } from '../../api/TMDB/Details/getDetails';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CastType } from '../../types/creditType';

import Skeleton from '@mui/material/Skeleton';
interface IProps {
  urlPath: string;
}

const CreditsPage = ({ urlPath }: IProps) => {
  const [credits, setCredits] = useState<CastType>([]);
  const [imgLoading, setImgLoading] = useState(false);
  function onLoad() {
    setImgLoading(true);
  }
  const fetch = async () => {
    try {
      const res = await getCredit(urlPath);
      setCredits(res.cast);
    } catch (error) {
      console.log(error);
    } finally {
      setImgLoading(true);
    }
  };
  useEffect(() => {
    fetch();
  }, [urlPath]);

  return (
    <Box sx={{ overflow: 'scroll', mt: 3 }}>
      <Typography variant="h5" fontWeight={500}>
        출연진
      </Typography>
      <Grid
        container
        spacing={2}
        style={{ minHeight: '330px' }}
        direction="row"
        flexWrap="nowrap"
        mt={0}
      >
        {credits.length > 10
          ? credits?.slice(0, 20).map((item) => (
              <Box key={item.name + 1}>
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
                        width={200}
                        height={300}
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
            ))
          : credits?.map((item) => (
              <Box key={item.name + 1}>
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
                        width={200}
                        height={'100%'}
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
  );
};

export default CreditsPage;
