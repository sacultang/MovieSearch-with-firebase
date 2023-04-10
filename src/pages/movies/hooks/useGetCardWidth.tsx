import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useGetCardWidth = () => {
  const cardBoxRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(200);
  const [isVisible, setIsVisible] = useState(false);
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
  useEffect(() => {
    const cardBoxRefCopy = cardBoxRef.current as HTMLDivElement;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(entry.isIntersecting);
          observer.unobserve(cardBoxRefCopy);
        }
      },
      { threshold: 0.5 }
    );
    if (cardBoxRefCopy) {
      observer.observe(cardBoxRefCopy);
    }

    return () => {
      if (cardBoxRefCopy) {
        observer.unobserve(cardBoxRefCopy);
      }
    };
  }, []);
  return { isVisible, cardBoxRef, cardWidth };
};

export default useGetCardWidth;
