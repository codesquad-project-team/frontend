import React from 'react';
import classNames from 'classnames/bind';
import styles from './Carousel.scss';

const cx = classNames.bind(styles);
const Carousel = ({ data, src, key, className, style }) => {
  return (
    <div className={`${cx('viewport')} ${className}`} style={style}>
      <button className={cx('leftButton')}>
        <div className={cx('leftChevron')} />
      </button>
      <div className={cx('container')}>
        {data.map((el, idx) => (
          <img className={cx('items')} src={el[src]} key={key || idx} />
        ))}
      </div>
      <button className={cx('rightButton')}>
        <div className={cx('rightChevron')} />
      </button>
    </div>
  );
};

export default Carousel;
