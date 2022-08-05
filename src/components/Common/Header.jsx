import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import RegisterGroup from '../RegisterGroup';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
const Header = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <>
      <HeaderDIV>
        <Nav className="inner-container">
          <MenuUl>
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
      </HeaderDIV>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const MenuUl = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
`;

const MenuLi = styled.li`
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease-in;
  h4 {
    padding: 10px 20px;
    font-weight: 500;
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
  border-radius: 4px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

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
