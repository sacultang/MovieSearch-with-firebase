import { useEffect, useLayoutEffect, useState } from 'react';

const useIsVisibleGetCardWidth = <T extends HTMLDivElement>(
  ref: React.RefObject<T>
) => {
  const [cardWidth, setCardWidth] = useState(200);
  const [isVisible, setIsVisible] = useState(false);
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

  useEffect(() => {
    const cardBoxRefCopy = ref.current as HTMLDivElement;

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
  }, [ref]);

  return { isVisible, cardWidth };
};

export default useIsVisibleGetCardWidth;
