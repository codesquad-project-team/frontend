import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import styles from './PostImage.scss';

const cx = classNames.bind(styles);

const PostImage = ({ headerOn, src }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const target = useRef(null);

  const [isVisible] = useIntersectionObserver({
    target,
  });
  return (
    <div className={cx('wrapper')} ref={target}>
      {isVisible && (
        <>
          <img
            style={{ opacity: isLoaded ? 1 : 0 }}
            onLoad={() => setIsLoaded(true)}
            className={cx('img', 'full', headerOn ? '' : 'without-header')}
            src={src}
            alt="representative post image"
          />
          <img
            className={cx('img', 'thumb')}
            style={{ opacity: isLoaded ? 0 : 1 }}
          />
          {!isLoaded && (
            <div className={cx('bar')}>
              <div className={cx('indicator')} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostImage;
