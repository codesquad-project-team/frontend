import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './useShakeAnimation.scss';

const cx = classNames.bind(styles);

const ANIMATION_DELAY = 300;

const useShakeAnimation = shakeTarget => {
  const [isFailed, setIsFailed] = useState(false);
  const shake = () => setIsFailed(state => !state);

  useEffect(() => {
    if (isFailed) {
      shakeTarget.current.classList.add(cx('shake'));

      setTimeout(() => {
        shakeTarget.current.classList.remove(cx('shake'));
        setIsFailed(false);
      }, ANIMATION_DELAY);
    }
  }, [isFailed]);

  return [shake];
};

export default useShakeAnimation;
