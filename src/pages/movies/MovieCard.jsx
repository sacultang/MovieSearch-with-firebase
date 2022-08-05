import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const MovieCard = ({ movie }) => {
  const [favorite, setFavorite] = useState(false);
  return (
    <CardItem
      sx={{
        minWidth: 166,
        maxWidth: 166,
        minHeight: 250,
        // border: '1px solid #dede',
        boxShadow: 'none',
        position: 'relative',
        mr: 1,
        ml: 2,
        mt: 1,
      }}
    >
      <CardImg
        component="img"
        image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
        alt={movie.original_title}
        sx={{ borderRadius: '10px' }}
      />
      <IconButton
        sx={{
          position: 'absolute',
          top: 5,
          right: 5,
          backgroundColor: 'rgba(221,221,221,0.47)',
          borderRadius: '50%',
        }}
        onClick={() => setFavorite((prev) => !prev)}
      >
        {favorite ? (
          <FavoriteIcon
            sx={{ color: '#ff5d5d', width: '1rem', height: '1rem' }}
          />
        ) : (
          <FavoriteBorder sx={{ width: '1rem', height: '1rem' }} />
        )}
      </IconButton>
      <IconButton
        aria-label="settings"
        sx={{
          position: 'absolute',
          top: 42,
          right: 5,
          backgroundColor: 'rgba(221,221,221,0.47)',
          borderRadius: '50%',
        }}
      >
        <MoreVertIcon sx={{ width: '1rem', height: '1rem' }} />
      </IconButton>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pt: 1,
        }}
      >
        <Typography
          gutterBottom
          variant="body"
          sx={{ fontSize: '0.8rem', mr: 1, mb: 0 }}
        >
          {movie.release_date}
        </Typography>
        <Typography
          gutterBottom
          variant="body"
          sx={{
            fontSize: '0.8rem',
            fontWeight: 600,
            mb: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <StarIcon
            sx={{
              width: '1rem',
              height: '1rem',
              color: 'var(--yellow-text-color)',
              mb: 0,
            }}
          />
          {movie.vote_average}
        </Typography>
      </Box>
      <Typography
        gutterBottom
        variant="h2"
        component="h2"
        sx={{ fontSize: '1rem', fontWeight: 700, pt: 1, pb: 1 }}
      >
        {movie.original_title.length > 15
          ? movie.original_title.slice(0, 17) + ' ...'
          : movie.original_title}
      </Typography>
    </CardItem>
  );
};

export default MovieCard;

const CardItem = styled(Card)`
  &:hover {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-bottom: 5px solid var(--yellow-text-color);
    }
    h2 {
      color: var(--yellow-text-color);
    }
  }
`;
const CardImg = styled(CardMedia)`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.03);
    /* &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border: 5px solid var(--yellow-text-color);
    } */
  }
`;
// const MovieImg = styled.img`
//   width: 100%;
// `;

// <CardMedia
//         component="img"
//         height="244"
//         image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
//         alt="Paella dish"
//       />
//       <CardContent>
//         <Typography
//           gutterBottom
//           variant="h5"
//           component="div"
//           sx={{ fontSize: '1rem' }}
//           textOverflow="hidden"
//         >
//           {movie.original_title}
//         </Typography>
//         <Typography variant="caption">{movie.release_date}</Typography>
