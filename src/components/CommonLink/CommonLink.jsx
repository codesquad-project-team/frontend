import React from 'react';
import './CommonLink.scss';
import { Link } from 'react-router-dom';

const CommonLink = ({ className = '', onClick, children, ...restProps }) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleClick = () => {
    onClick ? onClick() : null;
    scrollToTop();
  };

  return (
    <Link
      className={`common-link ${className}`}
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </Link>
  );
};

export default CommonLink;
