import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Profile = () => {
  return (
    <Container>
      <Box className="inner-container" sx={{ pt: 3, pb: 3 }}>
        <Typography variant="h2" sx={{ fontWeight: 500, fontSize: '1.4rem' }}>
          프로필
        </Typography>
        <Button variant="contained">비밀번호 수정</Button>
        <Button variant="contained">프로필사진 변경</Button>
      </Box>
    </Container>
  );
};

export default Profile;
