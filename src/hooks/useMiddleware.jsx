import { useState, useCallback } from 'react';
const NO_MIDDLE_WARE_DETECTED =
  'you must pass "middleware function" as 3rd parameter to use reducerMiddleware hook';

/**
 * 디스패치 이후 미들웨어를 사용할 수 있게 해주는 커스텀 훅입니다.
 * dispatch > action > middleware > reducer 의 흐름으로 동작합니다.
 * 액션객체는 {type, payload}의 형태로 작성합니다.
 * @param {Function} reducer state를 업데이트하는 동기로직을 담고있는 리듀서 함수
 * @param {any} initialState 초기 state
 * @param {Function|Object} [middleware] [optional] 디스패치된 값을 처리할 미들웨어 함수 또는,
 *   미들웨어 함수가 담긴 배열. 미들웨어 함수가 리턴한 값은 리듀서에 전달됩니다.
 *   미들웨어가 type 프로퍼티를 가진 객체를 리턴할 경우 액션 객체로 간주하며,
 *   이 후 로직은 해당 액션타입의 로직이 적용됩니다.
 *   액션타입이 아닌 값을 type 프로퍼티에 할당하지 않도록 주의하세요.
 * @returns {Array} [ state, dispatch ]
 *
 * @example
 * https://codesandbox.io/s/usemiddleware-gjv7v
 */
const useMiddleware = (reducer, initialState, middleware) => {
  if (!middleware) throw Error(NO_MIDDLE_WARE_DETECTED);

  const [state, setState] = useState(initialState);

  let _middleware;
  if (isArray(middleware))
    _middleware = middleware.map(_function => bindActionCreator(_function));

  if (isFunction(middleware)) _middleware = [bindActionCreator(middleware)];

  const _updateState = action => setState(state => reducer(state, action));

  const dispatch = useCallback(
    param => goAnyway(param, ..._middleware, _updateState),
    []
  );

  return [state, dispatch];
};

export default useMiddleware;

/**
 * 프로미스이든지 아니든지 어쨌든 go 합니다.
 * 콜백함수를 순서대로 실행합니다.
 * 첫번째 인자는 첫번째 콜백에 전달합니다.
 * 이전 콜백의 결과가 프로미스이면 비동기로 동작하고, 아니면 동기로 동작합니다.
 * 중간에 비동기함수가 하나라도 있으면 그 이후는 비동기로 동작합니다.
 * @param {any} a
 * @param {Function} f
 */
const goAnyway = (a, ...f) => _pipe(...f)(a);
const _pipe = (...f) => p =>
  f.reduce(goAnyway1, p instanceof Promise ? Promise.resolve(p) : p);

/**
 * 첫번째 인자가 프로미스이면 비동기로 동작하고, 아니면 동기로 동작하는 함수.
 * @param {any | Promise} p
 * @param {Function} f
 */
const goAnyway1 = (p, f) => bindThen(f)(p);
const bindThen = f => p => (p instanceof Promise ? p.then(f) : f(p));

/**
 * 액션생성함수가 바인딩 된 미들웨어 함수를 리턴합니다.
 * @param {Function} middleware
 * @returns {Function} middleware function
 */
const bindActionCreator = middleware => action => {
  const createAction = bindType(action.type);
  return goAnyway(action, middleware, createAction);
};

/**
 * reducer에 전달하기 위한 액션 객체를 생성하는 함수를 리턴합니다.
 * 리턴된 함수는 미들웨어의 실행결과를 받아서 액션을 생성합니다.
 * @param {string} type
 * @returns {Function} createAction function
 */
const bindType = type => middlewareResult =>
  isActionObject(middlewareResult)
    ? middlewareResult
    : {
        type,
        payload: middlewareResult
      };

const { isArray } = Array;
const isFunction = func => typeof func === 'function';
const isObject = obj =>
  obj !== undefined && obj !== null && obj.constructor === Object;
const hasTypeProps = obj => !!obj.type;
const isActionObject = obj => isObject(obj) && hasTypeProps(obj);

export const createMiddleware = obj => ({ type, payload }) =>
  obj[type] ? obj[type](payload) : payload;
