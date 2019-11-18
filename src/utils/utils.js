export const getClassName = ({ props, prefix }) => {
  const { small, medium, large } = props;
  let className = '';
  if (small) className = `${prefix}-small`;
  if (medium) className = `${prefix}-medium`;
  if (large) className = `${prefix}-large`;
  return className;
};

export const throttle = (callback, delay = 200) => {
  let lastCall = 0;
  return (...param) => {
    const now = new Date().getTime();
    if (now - lastCall > delay) {
      lastCall = now;
      return callback(...param);
    }
  };
};

export const debounce = (callback, delay = 300) => {
  let timer;
  return (...param) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...param), delay);
  };
};
