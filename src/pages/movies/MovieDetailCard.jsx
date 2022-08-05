import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';

const MovieDetailCard = ({ title, image, overview, date }) => {
  return (
    <Card sx={{ maxWidth: '80%', display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="140"
          image={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2/${image}`}
          alt="green iguana"
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography component="div" variant="h5">
          Live From Space
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Mac Miller
        </Typography>
      </Box>
    </Card>
  );
};

export default MovieDetailCard;
