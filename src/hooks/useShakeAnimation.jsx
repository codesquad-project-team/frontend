import { useState, useEffect } from 'react';
import './useShakeAnimation.scss';

const ANIMATION_DELAY = 300;

const useShakeAnimation = shakeTarget => {
  const [signupFailed, setSignupFailed] = useState(false);

  useEffect(() => {
    if (signupFailed) {
      shakeTarget.current.classList.add('shake');

      setTimeout(() => {
        shakeTarget.current.classList.remove('shake');
        setSignupFailed(false);
      }, ANIMATION_DELAY);
    }
  }, [signupFailed]);

  return { setSignupFailed };
};

export default useShakeAnimation;
