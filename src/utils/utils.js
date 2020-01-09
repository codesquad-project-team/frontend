export const getClassName = props => {
  const { small, medium, large } = props;
  if (small) return 'small';
  if (medium) return 'medium';
  if (large) return 'large';
  return '';
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

export const YYYYMMDDHHMMSS = dateObj => {
  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }
  return (
    dateObj.getFullYear() +
    pad2(dateObj.getMonth() + 1) +
    pad2(dateObj.getDate()) +
    pad2(dateObj.getHours()) +
    pad2(dateObj.getMinutes()) +
    pad2(dateObj.getSeconds())
  );
};

export const debounce = (callback, delay = 300) => {
  let timer;
  return (...param) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...param), delay);
  };
};
