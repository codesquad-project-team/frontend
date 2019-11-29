import React from 'react';
import './CommonLink.scss';
import { Link } from 'react-router-dom';

const CommonLink = ({ className = '', children, ...restProps }) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <Link
      className={`common-link ${className}`}
      onClick={scrollToTop}
      {...restProps}
    >
      {children}
    </Link>
  );
};

export default CommonLink;
