import React, { useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
const ScrollToTop = () => {
  const [scrollY, setScrollY] = useState(0);
  const [btnStatus, setBtnStatus] = useState(false);
  const [throttle, setThrottle] = useState(false);

  const handleFollow = useCallback(() => {
    if (throttle) return;
    if (!throttle) {
      setThrottle(true);
      setTimeout(() => {
        setScrollY(window.scrollY);
        setThrottle(false);
      }, 100);
    }
  }, [throttle]);

  const watch = useCallback(() => {
    window.addEventListener('scroll', handleFollow);
  }, [handleFollow]);
  useEffect(() => {
    if (scrollY > 200) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  }, [scrollY]);
  useEffect(() => {
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  }, []);
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setScrollY(0);
    setBtnStatus(false);
  };
  return (
    <ToTopDiv btnStatus={btnStatus} onClick={handleTop}>
      <ArrowUpwardIcon color="inherit" />
    </ToTopDiv>
  );
};

export default ScrollToTop;
type ToTopTypeProps = {
  btnStatus: boolean;
};
const ToTopDiv = styled.div`
  cursor: pointer;
  position: fixed;
  bottom: 5%;
  right: 3%;
  z-index: 3;
  opacity: ${({ btnStatus }: ToTopTypeProps) => (btnStatus ? 1 : 0)};
  transition: opacity 0.3s ease;
  background-color: var(--main-bg-color);
  border: 1px solid #565656;
  box-shadow: 1px 3px 10px 2px rgba(178, 178, 178, 0.48);
  display: flex;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;
