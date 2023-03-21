import { useEffect, useRef, useState } from 'react';

export const useIsImgLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imgRefCopy = imgRef.current as HTMLImageElement;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoaded(true);
        observer.unobserve(imgRefCopy);
      }
    });

    observer.observe(imgRefCopy);

    return () => {
      observer.unobserve(imgRefCopy);
    };
  }, []);
  return { imgRef, loaded };
};
