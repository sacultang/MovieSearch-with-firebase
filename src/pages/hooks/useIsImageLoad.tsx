import { useEffect, useRef, useState, RefObject } from 'react';

const useIsImgLoaded = <T extends HTMLDivElement>(
  cardBoxRef?: RefObject<T>
) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imgRefCopy = imgRef.current as HTMLImageElement;

    const cardBoxRefCopy = cardBoxRef && (cardBoxRef.current as HTMLDivElement);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.unobserve(imgRefCopy);
        }
      },
      {
        root: cardBoxRefCopy,
        rootMargin: '500px 0px 0px 0px',
      }
    );
    observer.observe(imgRefCopy);

    return () => {
      observer.unobserve(imgRefCopy);
    };
  }, [cardBoxRef]);
  return { imgRef, loaded, setLoaded };
};
export default useIsImgLoaded;
