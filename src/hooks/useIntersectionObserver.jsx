import { useEffect } from 'react';

const useIntersectionObserver = ({
  target,
  onIntersect,
  root,
  rootMargin = '0px',
  threshold = 0.1,
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });

    const targetElement = target.current;
    observer.observe(targetElement);

    return () => {
      observer.unobserve(targetElement);
    };
  }, []);
};

export default useIntersectionObserver;
