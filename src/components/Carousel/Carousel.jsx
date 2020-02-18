import React, { useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Carousel.scss';

const cx = classNames.bind(styles);

const Carousel = ({ data, src, key, className, style }) => {
  const [targetIndex, setTargetIndex] = useState(0);
  const dataLength = useMemo(() => data.length, [data]);
  const isLeftEnd = !targetIndex;
  const isRightEnd = targetIndex === dataLength - 1;

  const showPrev = () => setTargetIndex(index => index - 1);
  const showNext = () => setTargetIndex(index => index + 1);

  return (
    <div className={`${cx('viewport')} ${className}`} style={style}>
      {!isLeftEnd && (
        <button className={cx('leftButton')} onClick={showPrev}>
          <div className={cx('leftChevron')} />
        </button>
      )}
      <div
        className={cx('container')}
        style={{
          transform: `translateX(${targetIndex * -100}%)`
        }}
      >
        {data.map((el, idx) => (
          <img
            className={cx('items')}
            src={el[src] || el}
            key={el[key] || idx}
          />
        ))}
      </div>
      {!isRightEnd && (
        <button className={cx('rightButton')} onClick={showNext}>
          <div className={cx('rightChevron')} />
        </button>
      )}
    </div>
  );
};

export default Carousel;
