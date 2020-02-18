import React, { useState, useMemo, useReducer, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Carousel.scss';

const cx = classNames.bind(styles);

const Carousel = ({ data, src, key, className, style }) => {
  const [targetIndex, setTargetIndex] = useState(0);
  const dataLength = useMemo(() => data.length, [data]);
  const isLeftEnd = !targetIndex;
  const isRightEnd = targetIndex === dataLength - 1;
  const [touchInfo, dispatch] = useReducer(reducer, {});

  const showPrev = () => !isLeftEnd && setTargetIndex(index => index - 1);
  const showNext = () => !isRightEnd && setTargetIndex(index => index + 1);

  const handleTouchStart = ({ changedTouches }) => {
    const { pageX, pageY } = changedTouches[0];
    dispatch({ type: 'touchStart', payload: { pageX, pageY } });
  };

  const handleTouchMove = ({ changedTouches }) => {
    const { pageX, pageY } = changedTouches[0];
    dispatch({ type: 'touchMove', payload: { pageX, pageY } });
  };

  const handleTouchEnd = () => {
    if (!touchInfo.isHorizontalMove) return;
    touchInfo.direction === 'next' ? showNext() : showPrev();
    dispatch({ type: 'touchEnd' });
  };

  useEffect(() => {
    const criterion = window.innerHeight / 3 / window.innerWidth; //기준기울기 = (0,0)부터 화면세로길이의 1/3지점까지의 기울기
    dispatch({ type: 'init', payload: criterion });
  }, []);

  return (
    <div className={className} style={style}>
      <div
        className={`${cx('viewport')}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'init':
      return { criterion: payload };
    case 'touchStart':
      return { ...state, ...payload, isTouchStarted: true };
    case 'touchMove':
      return { ...state, ...calculateMoveType(state, payload) };
    case 'touchEnd':
      return { criterion: state.criterion };
    default:
      //do nothing
      break;
  }
};

const calculateMoveType = (
  { isTouchStarted, criterion, ...prevCoord },
  currentCoord
) => {
  if (!isTouchStarted) return;

  const x = Math.abs(prevCoord.pageX - currentCoord.pageX);
  const y = Math.abs(prevCoord.pageY - currentCoord.pageY);
  const distance = x + y;

  //4px 미만으로 움직인 경우 아무동작 안함. 참고: https://d2.naver.com/helloworld/80243
  if (distance < 4) return;

  const slope = y / x;
  const isHorizontalMove = slope < criterion;
  const direction = prevCoord.pageX > currentCoord.pageX ? 'next' : 'prev';

  return { isHorizontalMove, direction };
};
