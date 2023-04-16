import { useLayoutEffect, useState } from 'react';

const useGetCardWidth = <T extends HTMLDivElement>(ref: React.RefObject<T>) => {
  const [cardWidth, setCardWidth] = useState(200);

  useLayoutEffect(() => {
    ref.current && setCardWidth(ref.current.offsetWidth);
    const handleWindowResize = () => {
      setTimeout(() => {
        ref.current && setCardWidth(ref.current.offsetWidth);
      }, 300);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [ref]);

  return { cardWidth };
};

export default useGetCardWidth;
