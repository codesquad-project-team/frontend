import React from 'react';
import classNames from 'classnames/bind';
import styles from './CloseBtn.scss';

const cx = classNames.bind(styles);

const CloseBtn = ({ className = '', onClick, children, ...restProps }) => {
  return (
    <button
      className={cx('close-btn', className)}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default CloseBtn;
