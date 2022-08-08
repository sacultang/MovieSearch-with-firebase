import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import RegisterGroup from '../RegisterGroup';
import { AppBar, Drawer, Toolbar } from '@mui/material';
const drawerWidth = 240;
const Header = () => {
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Nav>
          <MenuUl>
            <MenuLi>
              <Link to="/">{/* <LogoDiv /> */}</Link>
            </MenuLi>
            <MenuLi>
              <h4>영화</h4>
              <SubMenuUl>
                <li>
                  <Link to="/movie/popular">인기</Link>
                </li>
                <li>
                  <Link to="/movie/now_playing">현재 상영중</Link>
                </li>
                <li>
                  <Link to="/movie/upcoming">개봉 예정</Link>
                </li>
                <li>
                  <Link to="/movie/top_rated">높은 평점</Link>
                </li>
              </SubMenuUl>
            </MenuLi>
            <MenuLi>
              <h4>TV프로그램</h4>
              <SubMenuUl>
                <li>
                  <Link to="/tv/popular">인기</Link>
                </li>
                <li>
                  <Link to="/tv/airing_today">오늘 방영</Link>
                </li>
                <li>
                  <Link to="/tv/on_the_air">TV 방영중</Link>
                </li>
                <li>
                  <Link to="/tv/top_rated">높은 평점</Link>
                </li>
              </SubMenuUl>
            </MenuLi>
            <MenuLi>
              <h4>인물</h4>
              <SubMenuUl>
                <li>
                  <Link to="/">인기 인물</Link>
                </li>
              </SubMenuUl>
            </MenuLi>
          </MenuUl>

          <RegisterGroup />
        </Nav>
      </Drawer>
    </>
  );
};

export default Header;

const HeaderDIV = styled.div`
  height: 80px;
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
  display: flex;
  justify-content: space-between;
`;
const Nav = styled.nav`
  height: 100%;
  min-height: 'calc(100vh - 64px)';
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const MenuUl = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
`;
// const LogoDiv = styled.div`
//   width: 50px;
//   height: 30px;
//   border-radius: 20px;
//   background: #8360c3;
//   background: -webkit-linear-gradient(to right, #2ebf91, #8360c3);
//   background: linear-gradient(to right, #2ebf91, #8360c3);
// `;
const MenuLi = styled.li`
  cursor: pointer;
  border-radius: 20px;
  transition: background-color 0.3s ease-in;
  margin-right: 10px;
  h4 {
    padding: 0 20px;
    height: 30px;
    line-height: 30px;
    font-weight: 500;
  }
  &:nth-of-type(1):hover {
    background-color: transparent;
  }
  &:hover {
    background-color: var(--yellow-text-color);
    color: #000;

    ul {
      display: block;
    }
  }
`;

const SubMenuUl = styled.ul`
  position: absolute;
  display: none;
  background-color: var(--main-bg-color);
  min-width: 160px;
  border-radius: 15px;
  box-shadow: 0px 0px 10px 5px rgba(167, 167, 167, 0.22);
  z-index: 1;
  overflow: hidden;

  li {
    transition: background-color 0.3s ease-in;
    a {
      padding: 20px;
      box-sizing: border-box;
      color: var(--main-text-color);
      width: 100%;
      height: 100%;
      display: inline-block;
    }
    &:hover {
      background-color: var(--yellow-text-color);
      a {
        color: #000;
      }
    }
  }
`;
