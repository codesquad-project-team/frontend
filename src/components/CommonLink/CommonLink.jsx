import React from 'react';
import classNames from 'classnames/bind';
import styles from './CommonLink.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const CommonLink = ({ className = '', onClick, children, ...restProps }) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleClick = e => {
    e.stopPropagation();
    onClick ? onClick() : null;
    scrollToTop();
  };

  return (
    <Link
      className={cx('common-link', className)}
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </Link>
  );
};

export default CommonLink;
