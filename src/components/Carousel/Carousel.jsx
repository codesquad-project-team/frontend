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
    <div className={className} style={style}>
      <div className={`${cx('viewport')}`}>
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
        {!isLeftEnd && (
          <button className={cx('leftButton')} onClick={showPrev}>
            <div className={cx('leftChevron')} />
          </button>
        )}
        {!isRightEnd && (
          <button className={cx('rightButton')} onClick={showNext}>
            <div className={cx('rightChevron')} />
          </button>
        )}
      </div>
      <div className={cx('pagination-wrapper')}>
        {data.map((el, idx) => (
          <div
            key={idx}
            className={cx('pagination-dots', targetIndex === idx && 'active')}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
