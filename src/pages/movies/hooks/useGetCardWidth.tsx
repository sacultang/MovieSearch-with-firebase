import { useLayoutEffect, useRef, useState } from 'react';

const useGetCardWidth = () => {
  const cardBoxRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(200);

  useLayoutEffect(() => {
    cardBoxRef.current && setCardWidth(cardBoxRef.current.offsetWidth);
    const handleWindowResize = () => {
      setTimeout(() => {
        cardBoxRef.current && setCardWidth(cardBoxRef.current.offsetWidth);
      }, 300);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return { cardBoxRef, cardWidth };
};

export default useGetCardWidth;
