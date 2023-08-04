import { memo, useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import type { FlexBoxProps } from '../ui/FlexBox';

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
  }, [handleFollow, watch]);

  const handleTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setScrollY(0);
    setBtnStatus(false);
  }, []);

  return (
    <ToTopDiv btnStatus={btnStatus} onClick={handleTop}>
      <ArrowUpwardIcon color="inherit" />
    </ToTopDiv>
  );
};

export default memo(ScrollToTop);

interface ToTopTypeProps extends FlexBoxProps {
  btnStatus: boolean;
}

const ToTopDiv = styled.div<ToTopTypeProps>`
  cursor: pointer;
  position: fixed;
  bottom: 5%;
  right: 3%;
  z-index: 3;
  opacity: ${({ btnStatus }) => (btnStatus ? 1 : 0)};
  transition: opacity 0.3s ease;
  box-shadow: 1px 3px 10px 2px rgba(178, 178, 178, 0.48);
  display: flex;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
