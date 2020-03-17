import { useState, useCallback } from 'react';

/**
 * 동기/비동기 모두 같은 방식으로 dispatch하기 위한 커스텀 훅입니다.
 * 1. useAsyncAction의 3번째 인자를 전달하고, dispatch에 객체리터럴을 전달하거나,
 * 2. 3번째 인자를 전달하지 않고, dispatch에서 액션 함수를 호출하는 방식으로 사용할 수 있습니다.
 * @param {Function} reducer state를 업데이트하는 동기로직을 담고있는 리듀서 함수
 * @param {any} initialState 초기 state
 * @param {Object} [actionCreator] [optional] 액션 객체를 리턴하는 동기/비동기 액션함수가 매핑된 객체.
 * 동기로직은 액션함수를 정의하지 않고 dispatch에 액션객체를 바로 전달할 수 있습니다.
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

  const isReadyToReduce = param =>
    !actionCreator || _(param).isPromise || !_(param).has(actionCreator);

  const dispatch = useCallback(
    param =>
      promiseGo(
        isReadyToReduce(param)
          ? param
          : actionCreator[param.type](param.payload),
        action => setState(state => reducer(state, action))
      ),
    []
  );

  return [state, dispatch];
};

export default useAsyncAction;

/**
 * 인자의 프로미스 여부를 확인하거나 정의된 액션함수가 존재하는지 확인하기 위한 함수.
 * @param {any} param
 * @example
 * _(param).isPromise //returns Boolean(true or false)
 * _(param).has(actionCreator) //returns Boolean
 */
const _ = param => ({
  has: actionCreator => !!actionCreator[param.type],
  isPromise: (() => param instanceof Promise)()
});

/**
 * 첫번째 인자가 Promise이면 비동기로 동작하고, 아닌경우는 동기로 동작하는 유틸함수.
 * @param {any} a
 * @param {Function} f
 */
const promiseGo = (a, f) => (a instanceof Promise ? a.then(f) : f(a));
