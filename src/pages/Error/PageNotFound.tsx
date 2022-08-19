import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
const PageNotFound = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(4);
  useEffect(() => {
    if (timer <= 0) {
      navigate('/', { replace: true });
      return;
    }
    const redirectTime = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => {
      clearTimeout(redirectTime);
    };
  }, [timer, navigate]);
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      minHeight={800}
      alignItems={'center'}
    >
      <Typography variant="h4">잘못된 접근입니다.</Typography> <br />
      <Typography variant="h5">
        {timer - 1}초 후에{' '}
        <Link
          color="#da6600"
          underline="always"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/', { replace: true })}
        >
          메인
        </Link>
        으로 이동합니다.
      </Typography>
    </Box>
  );
};

export default PageNotFound;
