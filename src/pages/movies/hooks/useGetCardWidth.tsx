import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useGetCardWidth = () => {
  const cardBoxRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(400);

  useLayoutEffect(() => {
    const handleWindowResize = () => {
      cardBoxRef.current && setCardWidth(cardBoxRef.current.offsetWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  useEffect(() => {
    cardBoxRef.current && setCardWidth(cardBoxRef.current.offsetWidth);
  }, []);
  return { cardBoxRef, cardWidth };
};

export default useGetCardWidth;
