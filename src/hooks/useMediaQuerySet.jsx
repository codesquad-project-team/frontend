import React from 'react';
import { useMediaQuery } from 'react-responsive';

const useMediaQuerySet = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 });
  const isDesktop = useMediaQuery({ minWidth: 1200 });
  return { isDesktop, isTablet, isMobile };
};

export default useMediaQuerySet;
