import { useState, useCallback } from 'react';

/**
 * 디스패치 이후 미들웨어를 사용할 수 있게 해주는 커스텀 훅입니다.
 * dispatch > action > middleware > reducer 의 흐름으로 동작합니다.
 * 미들웨어는 동기/비동기 로직을 다룰 수 있습니다.
 * 디스패치에 전달하는 액션 객체는 type 프로퍼티를 반드시 구현해야 합니다.
 * @param {Function} reducer state를 업데이트하는 동기로직을 담고있는 리듀서 함수
 * @param {any} initialState 초기 state
 * @param {Object} [middleware] [optional] 디스패치된 값을 처리할 미들웨어 함수가 매핑된 객체.
 *   미들웨어 함수가 리턴한 값은 리듀서에 전달됩니다.
 * @returns {Array} [ state, dispatch ]
 *
 * @example
 */
const useReducerMiddleware = (reducer, initialState, middleware = {}) => {
  const [state, setState] = useState(initialState);

  const _middleware = bindActionCreator(middleware);
  const _updateState = bindThen(action =>
    setState(state => reducer(state, action))
  );

  const dispatch = useCallback(param => {
    _(param).has(middleware)
      ? go(param, _middleware, _updateState)
      : go(param, _updateState);
  }, []);

  return [state, dispatch];
};

export default useReducerMiddleware;

/**
 * 인자의 타입에 맞는 미들웨어가 존재하는지 확인하기 위한 함수.
 * @param {any} param
 * @example
 * _(param).has(middleware) //returns Boolean(true or false)
 */
const _ = param => ({
  has: middleware => !!middleware[param.type]
});

/**
 * 프로미스이든지 아니든지 어쨌든 go 합니다.
 * 콜백함수를 순서대로 실행합니다.
 * 첫번째 인자는 첫번째 콜백에 전달합니다.
 * 이전 콜백의 결과가 프로미스이면 비동기로 동작하고, 아니면 동기로 동작합니다.
 * 중간에 비동기함수가 하나라도 있으면 그 이후는 비동기로 동작합니다.
 * @param {any} a
 * @param {Function} f
 */
const goAnyway = (a, ...f) => _go(...f)(a);
const _go = (...f) => p =>
  f.reduce(
    (acc, cur) => (acc instanceof Promise ? acc.then(cur) : cur(acc)),
    p instanceof Promise ? Promise.resolve(p) : p
  );

/**
 * 인자가 프로미스이면 비동기로 동작하고, 아니면 동기로 동작하는 함수를 리턴합니다.
 * @param {Function} f
 * @returns {Function}
 */
const bindThen = f => p => (p instanceof Promise ? p.then(f) : f(p));

const goAnyway1 = (p, f) => bindThen(f)(p);

const pipe = (...f) => p => f.reduce((acc, cur) => cur(acc), p);
const go = (p, ...f) => pipe(...f)(p);

/**
 * 액션생성함수가 바인딩 된 미들웨어 함수를 리턴합니다.
 * @param {Object} middleware
 */
const bindActionCreator = middleware => param => {
  const createAction = bindType(param.type);
  return goAnyway({ middleware, ...param }, processMiddleware, createAction);
};

/**
 * 미들웨어를 실행합니다.
 * @param {{middleware: Object, type: string, props: any}}
 * @property {any} props dispatch에 전달한 액션 객체의 프로퍼티. 미들웨어 함수에 전달됩니다.
 */
const processMiddleware = ({ middleware, type, payload }) => {
  return middleware[type](payload);
};

/**
 * reducer에 전달하기 위한 액션 객체를 생성하는 함수를 리턴합니다.
 * 리턴된 함수는 미들웨어의 실행결과를 받아서 액션을 생성합니다.
 * @param {string} type
 */
const bindType = type => payload => ({ type, payload });
