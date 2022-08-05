import React from 'react';
import styled from '@emotion/styled';

const Footer = () => {
  return <FooterEl>Footer</FooterEl>;
};

export default Footer;

const FooterEl = styled.footer`
  height: 200px;
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
  position: relative;
  width: 100%;
`;
