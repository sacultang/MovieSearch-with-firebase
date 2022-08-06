import React, { useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import { Stack, CircularProgress } from '@mui/material';
const TvCard = ({ tv }) => {
  const [favorite, setFavorite] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [imgLoading, setImgLoading] = useState(true);
  const open = Boolean(anchorEl);

  const handleOpenMenu = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, []);
  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);
  useEffect(() => {}, []);
  return (
    <CardItem
      sx={{
        minWidth: 166,

        boxShadow: 'none',
        position: 'relative',
        ml: 1,
        mr: 1,
        mt: 1,
        mb: 1,
      }}
    >
      {imgLoading ? (
        <Stack alignItems="center" justifyContent="center" height={250}>
          <CircularProgress color="secondary" size={30} />
          <CardImg
            component="img"
            image={`https://image.tmdb.org/t/p/w300/${tv.poster_path}`}
            sx={{ display: 'none' }}
            onLoad={() => setImgLoading(false)}
          />
        </Stack>
      ) : (
        <CardImg
          component="img"
          image={`https://image.tmdb.org/t/p/w300/${tv.poster_path}`}
          alt={tv.original_name}
          sx={{ borderRadius: '10px', minHeight: 248.99 }}
          onLoad={() => setImgLoading(false)}
        />
      )}

      <IconButton
        sx={{
          position: 'absolute',
          top: 5,
          right: 5,
          backgroundColor: 'rgba(221,221,221,0.57)',
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
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          position: 'absolute',
          top: 42,
          right: 5,
          backgroundColor: 'rgba(221,221,221,0.57)',
          borderRadius: '50%',
        }}
        onClick={handleOpenMenu}
      >
        <MoreVertIcon sx={{ width: '1rem', height: '1rem' }} />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={handleCloseMenu}
        anchorEl={anchorEl}
      >
        <MenuItem onClick={handleCloseMenu}>
          <ListIcon sx={{ width: '1rem' }} />
          <Typography
            gutterBottom
            variant="body"
            sx={{ fontSize: '0.8rem', mb: 0 }}
          >
            &nbsp;목록에 추가
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <StarIcon
            sx={{
              width: '1rem',
              height: '1rem',
            }}
          />
          <Typography
            gutterBottom
            variant="body"
            sx={{ fontSize: '0.8rem', mb: 0 }}
          >
            &nbsp;즐겨찾기 추가
          </Typography>
        </MenuItem>
      </Menu>
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
          {tv.release_date}
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
          {tv.vote_average}
        </Typography>
      </Box>
      <Typography
        gutterBottom
        variant="h2"
        component="h2"
        sx={{ fontSize: '1rem', fontWeight: 700, pt: 1, pb: 1 }}
      >
        {tv.original_name.length > 15
          ? tv.original_name.slice(0, 17) + ' ...'
          : tv.original_name}
      </Typography>
    </CardItem>
  );
};

export default TvCard;

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
