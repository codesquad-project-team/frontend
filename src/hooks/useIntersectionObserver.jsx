import { useEffect, useState } from 'react';

const useIntersectionObserver = ({
  target,
  onIntersect,
  root,
  rootMargin = '0px',
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const onIntersectDefault = ([{ isIntersecting }], observer) => {
    if (isIntersecting) {
      setIsVisible(true);
      observer.unobserve(target.current);
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      onIntersect || onIntersectDefault,
      {
        root,
        rootMargin,
        threshold,
      }
    );

    const targetElement = target.current;
    observer.observe(targetElement);

    return () => {
      observer.unobserve(targetElement);
    };
  }, []);
  return [isVisible];
};

export default useIntersectionObserver;
