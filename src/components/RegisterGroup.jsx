import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import { Menu, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../firebase';
import { getAuth, signOut } from 'firebase/auth';

const RegisterGroup = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector((state) => state.user.user);
  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogOut = useCallback(async () => {
    await signOut(getAuth());
    setAnchorEl(null);
  }, []);
  return (
    <RegisterGroupDiv>
      {user && (
        <Typography
          variant="body"
          sx={{
            fontSize: '0.8rem',
            mb: 0,
            mr: 2,
            color: 'var(--main-text-color)',
          }}
        >
          <Typography
            variant="body"
            sx={{
              fontSize: '0.8rem',
              mb: 0,
              fontWeight: 500,
              color: 'var(--main-text-color)',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            {user.email}
          </Typography>
          님 안녕하세요.
        </Typography>
      )}
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
      {user ? (
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClose={handleCloseMenu}
          anchorEl={anchorEl}
        >
          <MenuItem onClick={handleLogOut}>
            <Typography
              gutterBottom
              variant="body"
              sx={{ fontSize: '0.8rem', mb: 0, color: '#161618' }}
            >
              &nbsp;로그아웃
            </Typography>
          </MenuItem>
          <MenuItem>
            <Typography
              gutterBottom
              variant="body"
              component={Link}
              to="/profile"
              sx={{ fontSize: '0.8rem', mb: 0, color: '#161618' }}
            >
              &nbsp;프로필
            </Typography>
          </MenuItem>
        </Menu>
      ) : (
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
      )}
    </RegisterGroupDiv>
  );
};

export default RegisterGroup;

const RegisterGroupDiv = styled.div``;
