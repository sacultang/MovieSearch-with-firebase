import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CreditsCard from './components/CreditsCard';
import ScrollWrapBox from '../../components/scrollGrid/ScrollWrapBox';
import { CreditType } from '../../types/creditType';

interface CreditsPageProps {
  credits: CreditType[];
}

const CreditsPage = ({ credits }: CreditsPageProps) => {
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
