import { useState, useCallback } from 'react';

/**
 * 동기/비동기 모두 같은 방식으로 dispatch하기 위한 커스텀 훅입니다.
 * @param {Function} reducer state를 업데이트하는 동기로직을 담고있는 리듀서 함수
 * @param {any} initialState 초기 state
 * @param {Function} [actionCreator] [optional] 액션 객체를 리턴하는 동기/비동기 액션함수.
 * 동기로직은 액션함수를 정의하지 않고 dispach에 액션객체를 바로 전달할 수 있습니다.
 * @returns {Array} [ state, dispatch ]
 *
 * @example
 * 비동기 로직의 경우 action함수로 작성합니다.
 * 액션함수를 dispatch에서 직접 호출하는 경우( ex: dispatch(myAction()) )는
 * useAsyncAction에 3번째 인자를 전달하지 않는 것을 권장합니다.
 * https://codesandbox.io/s/useasyncaction-iz3h2
 */
const useAsyncAction = (reducer, initialState, actionCreator) => {
  const [state, setState] = useState(initialState);

  const dispatch = useCallback(
    param =>
      then(
        action => setState(state => reducer(state, action)),
        !actionCreator || _(param).isPromise ? param : actionCreator(param)
      ),
    []
  );

  return [state, dispatch];
};

export default useAsyncAction;

/**
 * 인자의 프로미스 여부를 확인하기 위한 함수.
 * @param {any} a
 * @example
 * _(param).isPromise //returns Boolean(true or false)
 */
const _ = a => ({ isPromise: (() => a instanceof Promise)() });

/**
 * 두번째 인자가 Promise이면 비동기로 동작하고, 아닌경우는 동기로 동작하는 유틸함수.
 * @param {Function} f
 * @param {any} a
 */
const then = (f, a) => (a instanceof Promise ? a.then(f) : f(a));
