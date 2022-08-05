import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
const CardSkeleton = () => {
  return (
    <Card sx={{ minWidth: 166, maxWidth: 166, mr: 1, ml: 2, mt: 1 }}>
      {<Skeleton sx={{ height: 250 }} animation="wave" variant="rectangular" />}
      <CardContent>
        <React.Fragment>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </React.Fragment>
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;
