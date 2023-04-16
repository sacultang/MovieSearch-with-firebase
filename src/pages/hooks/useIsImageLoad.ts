import { useEffect, useState, useRef } from 'react';

const useIsImgLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imgRefCopy = imgRef && (imgRef.current as HTMLImageElement);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.unobserve(imgRefCopy);
        }
      },
      {
        rootMargin: '500px 0px 0px 0px',
      }
    );
    observer.observe(imgRefCopy);

    return () => {
      observer.unobserve(imgRefCopy);
    };
  }, []);
  return { imgRef, loaded, setLoaded };
};
export default useIsImgLoaded;
