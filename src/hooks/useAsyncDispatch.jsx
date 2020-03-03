import { useState } from 'react';

/**
 * @param {Function} reducer state를 업데이트하는 동기로직을 담고있는 리듀서 함수
 * @param {Function} asyncAction 액션 객체를 리턴하는 비동기 액션함수.
 *   asyncDispatch에서 액션함수를 직접 호출하는 경우 이 값은 null로 전달해야 합니다. codesandbox예시 참고.
 * @param {any} initialState 초기 state
 * @returns {Array} [ state, dispatch, asyncDispatch ]
 *
 * @example
 * https://codesandbox.io/s/useasyncreducer-8dpu3
 */
const useAsyncDispatch = (reducer, asyncAction, initialState) => {
  const [state, setState] = useState(initialState);

  const dispatch = param => setState(state => reducer(state, param));

  const asyncDispatch = asyncAction
    ? async param => setState(reducer(state, await asyncAction(param)))
    : async param => setState(reducer(state, await param));

  return [state, dispatch, asyncDispatch];
};

export default useAsyncDispatch;
