import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import React from 'react';
interface HideAppBarProps {
  window?: () => Window;
  children: React.ReactElement;
}
const HideAppBarOnScroll = ({ children, window }: HideAppBarProps) => {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideAppBarOnScroll;
