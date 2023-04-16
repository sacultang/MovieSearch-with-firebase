import { useEffect, useState } from 'react';

const useIsVisible = <T extends HTMLDivElement>(ref: React.RefObject<T>) => {
  const [isVisible, setIsVisible] = useState(false);

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

  return { isVisible };
};

export default useIsVisible;
