import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
const Header = () => {
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
                  <Link to="/">인기</Link>
                </li>
                <li>
                  <Link to="/">현재 상영중</Link>
                </li>
                <li>
                  <Link to="/">개봉 예정</Link>
                </li>
                <li>
                  <Link to="/">높은 평점</Link>
                </li>
              </SubMenuUl>
            </MenuLi>
            <MenuLi>
              <h4>인물</h4>
              <SubMenuUl>
                <li>
                  <Link to="/">인기</Link>
                </li>
                <li>
                  <Link to="/">현재 상영중</Link>
                </li>
                <li>
                  <Link to="/">개봉 예정</Link>
                </li>
                <li>
                  <Link to="/">높은 평점</Link>
                </li>
              </SubMenuUl>
            </MenuLi>
          </MenuUl>
        </Nav>
      </HeaderDIV>
    </>
  );
};

export default Header;

const HeaderDIV = styled.div`
  height: 80px;
  background-color: var(--main-bg-color);
  color: var(--main-text);
`;
const Nav = styled.nav`
  height: 100%;
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
    background-color: var(--yellow-text);
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
    padding: 20px;
    transition: background-color 0.3s ease-in;
    &:hover {
      background-color: var(--yellow-text);
      a {
        color: #000;
      }
    }
  }
`;
