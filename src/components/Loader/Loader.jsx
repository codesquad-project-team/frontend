import React from 'react';
import classNames from 'classnames/bind';
import styles from './Loader.scss';

const cx = classNames.bind(styles);

const Loader = ({ size, unit }) => {
  return (
    <div className={cx('wrapper', 'center')}>
      <div
        className={cx('loader')}
        style={{ width: `${size}${unit}`, height: `${size}${unit}` }}
      />
    </div>
  );
};

export default Loader;
