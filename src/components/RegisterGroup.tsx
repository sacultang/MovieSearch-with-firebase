import React, { useState, MouseEvent } from 'react';
import styled from '@emotion/styled';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { RootState } from '../store/store';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../firebase';
import { setFavoriteAction } from '../store/favoriteListSlice';

const RegisterGroup = () => {
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogOut = async () => {
    await signOut(getAuth());
    dispatch(setFavoriteAction([]));
    setAnchorEl(null);
  };

  return (
    <RegisterGroupDiv>
      {user?.uid && (
        <Typography
          variant="body1"
          sx={{
            fontSize: '0.8rem',
            mb: 0,
            mr: 2,
            color: 'text.main',
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
              sx={{ fontSize: '0.8rem', mb: 0, color: 'text.main' }}
            >
              &nbsp;로그아웃
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
          <MenuItem component={Link} to="/login" onClick={handleCloseMenu}>
            <Typography
              gutterBottom
              variant="body1"
              sx={{ fontSize: '0.8rem', mb: 0, color: 'text.main' }}
            >
              &nbsp;로그인
            </Typography>
          </MenuItem>
          <MenuItem component={Link} to="/join" onClick={handleCloseMenu}>
            <Typography
              gutterBottom
              variant="body1"
              sx={{ fontSize: '0.8rem', mb: 0, color: 'text.main' }}
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
  min-height: 64px;
`;
