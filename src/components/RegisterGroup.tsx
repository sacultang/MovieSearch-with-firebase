import React, { useState, useCallback, MouseEvent } from 'react';
import styled from '@emotion/styled';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import { Menu, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { RootState } from '../store/store';
const RegisterGroup = () => {
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const open = Boolean(anchorEl);
  const user = useSelector((state: RootState) => state.user.user);
  const handleOpenMenu = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);
  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);
  const handleLogOut = useCallback(async () => {
    await signOut(getAuth());
    setAnchorEl(null);
  }, []);
  return (
    <RegisterGroupDiv>
      {user?.uid && (
        <Typography
          variant="body1"
          sx={{
            fontSize: '0.8rem',
            mb: 0,
            mr: 2,
            color: 'var(--main-text-color)',
          }}
        >
          {user.email}님 안녕하세요.
        </Typography>
      )}
      <IconButton
        sx={{
          color: 'var(--main-text-color)',
          backgroundColor: 'rgba(221,221,221,0.17)',
          borderRadius: '50%',
        }}
        onClick={handleOpenMenu}
        aria-label="person"
      >
        <PersonIcon />
      </IconButton>
      {user?.uid ? (
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
              variant="body1"
              sx={{ fontSize: '0.8rem', mb: 0, color: '#161618' }}
            >
              &nbsp;로그아웃
            </Typography>
          </MenuItem>
          <MenuItem>
            <Typography
              gutterBottom
              variant="body1"
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
              variant="body1"
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
              variant="body1"
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

const RegisterGroupDiv = styled.div`
  display: flex;
  align-items: center;
`;
