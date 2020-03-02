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

export const pipe = (...callbacks) => param =>
  callbacks.reduce((acc, curr) => curr(acc), param);

export const asyncPipe = (...callbacks) => param =>
  callbacks.reduce((acc, cur) => acc.then(cur), Promise.resolve(param));

/**
 * @returns {Promise}
 */
export const readFileAsDataURL = file =>
  new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', ({ target }) => {
      resolve(target.result);
    });
    reader.readAsDataURL(file);
  }).catch(err => console.warn(err));

export const profilePage = (nickname, id) => ({
  pathname: `/profile/@${nickname}`,
  state: { targetId: id }
});
/**
 * state updater 함수를 받아서 reducer와 async action을 바인딩하거나,
 * dispatch 함수를 받아서 async action을 바인딩 하는 함수.
 * asyncDispatch 함수를 리턴합니다.
 * useState, useReducer 모두 사용할 수 있습니다.
 * useReducer를 사용한 경우에는 reducer param을 전달하면 안됩니다.
 * @param {Function} updater setState or dispatch function
 * @param {Function} reducer reducer function. If updater is dispatch, not required.
 * @param {Object} [action] [optional] object that contains actionCreator functions
 * @returns {Function} asyncDispatch
 */
export const bindAsyncDispatch = (
  updater,
  reducer,
  action
) => async actionCreator => {
  try {
    if (typeof actionCreator === 'function') {
      //asyncDispatch(actionType(payload)) 와 같이 사용
      return reducer
        ? updater(reducer(await actionCreator()))
        : updater(await actionCreator());
    }

    if (typeof actionCreator === 'object') {
      //asyncDispatch({ type, payload }) 와 같이 사용
      const { type, payload } = actionCreator;
      return reducer
        ? updater(reducer(await action[type](payload)()))
        : updater(await action[type](payload)());
    }
  } catch (err) {
    console.warn('action type을 확인해주세요.');
  }
};

/**
 * state updater function을 받아서 reducer를 바인딩하는 함수. dispatch 함수를 리턴합니다.
 * useState를 사용한 경우에만 사용합니다.
 * useReducer는 이미 reducer가 바인딩 되어 있으므로 사용하지 않습니다.
 * @param {Function} updater setState function
 * @param {Function} reducer reducer function
 * @returns {Function} dispatch function
 */
export const bindDispatch = (updater, reducer) => actionCreator => {
  try {
    typeof actionCreator === 'function'
      ? updater(reducer(actionCreator())) //dispatch(actionType(payload)) 와 같이 사용
      : updater(reducer(actionCreator)); //dispatch({ type, payload }) 와 같이 사용
  } catch (err) {
    console.warn('action type을 확인해주세요.');
  }
};

export const handleResponse = (key, callbackMap) => {
  callbackMap[key]();
};
