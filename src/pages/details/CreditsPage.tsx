import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CastType } from '../../types/creditType';
import { requestData } from '../../api/TMDB/request';
import { METHOD_CONS } from '../../constants/fetchMethod';
import CreditsCard from './components/CreditsCard';
import ScrollWrapBox from '../../components/scrollGrid/ScrollWrapBox';

interface CreditsPageProps {
  urlPath: string;
}

const CreditsPage = ({ urlPath }: CreditsPageProps) => {
  const [credits, setCredits] = useState<CastType>([]);

  const creditsFetch = useCallback(async (urlPath: string) => {
    const res = await requestData(`${urlPath}/credits`, METHOD_CONS.get);
    setCredits(res.data.cast);
  }, []);

  useEffect(() => {
    creditsFetch(urlPath);
  }, [urlPath, creditsFetch]);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" fontWeight={500} mb={3}>
        출연진
      </Typography>
      <ScrollWrapBox height={370}>
        <Grid container direction="row" flexWrap="nowrap">
          {credits.length &&
            credits
              ?.slice(0, 20)
              .map((creditItem) => (
                <CreditsCard key={creditItem.name} creditItem={creditItem} />
              ))}
        </Grid>
      </ScrollWrapBox>
    </Box>
  );
};

export default CreditsPage;
