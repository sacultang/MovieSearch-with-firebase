import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
const CardSkeleton = () => {
  return (
    <Card sx={{ minWidth: 166, maxWidth: 166 }}>
      {<Skeleton sx={{ height: 250 }} animation="wave" variant="rectangular" />}
      <CardContent>
        <React.Fragment>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </React.Fragment>
      </CardContent>
      {/* <CardHeader
        action={null}
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        // subheader={<Skeleton animation="wave" height={10} width="40%" />}
      /> */}
    </Card>
  );
};

export default CardSkeleton;
