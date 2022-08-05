import React, { useState } from 'react';
import styled from '@emotion/styled';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import { Menu, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
const RegisterGroup = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <RegisterGroupDiv>
      <IconButton
        sx={{
          color: 'var(--main-text-color)',
          backgroundColor: 'rgba(221,221,221,0.17)',
          borderRadius: '50%',
        }}
        onClick={handleOpenMenu}
      >
        <PersonIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={handleCloseMenu}
        anchorEl={anchorEl}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Typography
            component={Link}
            to="/login"
            gutterBottom
            variant="body"
            sx={{ fontSize: '0.8rem', mb: 0, color: '#161618' }}
          >
            &nbsp;로그인
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <Typography
            component={Link}
            to="/join"
            gutterBottom
            variant="body"
            sx={{ fontSize: '0.8rem', mb: 0, color: '#161618' }}
          >
            &nbsp;회원가입
          </Typography>
        </MenuItem>
      </Menu>
    </RegisterGroupDiv>
  );
};

export default RegisterGroup;

const RegisterGroupDiv = styled.div``;
