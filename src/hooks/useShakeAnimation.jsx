import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './useShakeAnimation.scss';

const cx = classNames.bind(styles);

const ANIMATION_DELAY = 300;

const useShakeAnimation = shakeTarget => {
  const [signupFailed, setSignupFailed] = useState(false);

  useEffect(() => {
    if (signupFailed) {
      shakeTarget.current.classList.add(cx('shake'));

      setTimeout(() => {
        shakeTarget.current.classList.remove(cx('shake'));
        setSignupFailed(false);
      }, ANIMATION_DELAY);
    }
  }, [signupFailed]);

  return { setSignupFailed };
};

export default useShakeAnimation;
