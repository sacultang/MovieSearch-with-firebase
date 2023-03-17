import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Profile = () => {
  return (
    <Container>
      <Box sx={{ pt: 3, pb: 3 }}>
        <Typography variant="h2" sx={{ fontWeight: 500, fontSize: '1.4rem' }}>
          프로필
        </Typography>
      </Box>
    </Container>
  );
};

export default Profile;
