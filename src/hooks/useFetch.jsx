import { useState, useEffect, useMemo } from 'react';

/**
 * fetch를 이용해 리소스를 요청하고 응답을 받습니다.
 * @param {{onRequest: Function, onSuccess: Function, onError: Object|Function,
            watch: string|number|array, autoFetch: boolean, loadStatus: boolean}} object
 * @property {Function} onRequest - 요청을 보내기위해 실행할 함수. 프로미스를 리턴하는 함수여야 합니다.
 *   useFetch가 리턴하는 request 함수에 전달된 인자는 onRequest에 전달됩니다.
 * @property {Function} [onSuccess] - response status가 200번대인 경우 실행할 콜백함수(204제외).
 *   response의 content-type이 json인 경우 json객체를 인자로 전달받습니다.
 *   content-type이 json이 아닌 경우 response를 그대로 전달받습니다.
 * @property {Object|Function} [onError] - 에러를 핸들링할 함수 또는 함수를 매핑한 객체.
 *   status code에 따라 실행될 함수를 매핑합니다. 매핑된 값이 string인 경우 alert를 실행합니다.
 *   error객체를 리턴받고 싶은 경우 이 값에 아무것도 전달하지 않을 수 있습니다.
 * @property {string|number|array} [watch] - 주어진 값이 변경되는 경우 요청을 보냅니다.
 *   이 값이 true인 경우 컴포넌트가 처음 렌더링 될 때 onRequest함수를 실행합니다.
 * @property {boolean} [autoFetch] - 이 값이 true인 경우 컴포넌트가 처음 렌더링 될 때 요청을 보냅니다.
 *   watch할 값이 없는 경우 사용하는 용도입니다. watch 옵션이 false가 아닌 경우 이 옵션은 무시됩니다.
 * @property {boolean} [loadStatus] - 요청의 진행상태를 리턴 받고 싶은 경우 true로 설정합니다.
 *   이 값이 true인 경우 useFetch가 loading 프로퍼티를 리턴합니다.
 * @returns {Object} {data: (json data), error: (error object), loading: (boolean), request: (Function)}
 *
 * @example
 * const setUpdatedUserInfo = async () => await fetch(`example.com/user/${id}`);
 * const { loading, request } = useFetch({
 *   onRequest: sendUpdatedUserInfo,
 *   onSuccess: handleUpdateSuccess,
 *   onError: {
 *     204: () => setUserInfo(null),
 *     401: '인증되지 않은 토큰입니다.',
 *     500: '서버에서 문제가 발생했어요. 잠시 후에 다시 시도해주세요.'
 *   },
 *   watch: id,
 *   loadStatus: true
 * });
 */
const useFetch = ({
  onRequest,
  // onResponse,
  onSuccess,
  onError,
  watch,
  autoFetch,
  loadStatus,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const watchingValue = useMemo(() => getWatchingValue(watch), [watch]);

  const request = async (param) => {
    try {
      if (loadStatus) setLoading(true);
      const res = await onRequest(param);

      if (res instanceof Promise) throw Error('REQUEST FAILED'); //서버로부터 응답 자체를 받지 못한 경우.
      if (!res.ok) throw Error(res.status);
      if (res.status === 204) throw Error(res.status); //request success but no content

      //response를 별도로 다룰 필요가 생기는 경우 onResponse 함수를 입력받도록 수정
      const response = (res.headers.get('Content-Type') || '').includes('json')
        ? await res.json()
        : res;
      onSuccess ? onSuccess(response) : setData(response);
    } catch (error) {
      if (!onError) setError(error);
      if (isFunction(onError)) onError();
      else handleFetchError(error, onError);
    } finally {
      if (loadStatus) setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch || watch) {
      request();
    }
  }, [...watchingValue]);

  return loadStatus
    ? { data, error, loading, request }
    : { data, error, request };
};

export default useFetch;

const isFunction = (func) => typeof func === 'function';

const getWatchingValue = (watch) => {
  if (Array.isArray(watch)) {
    return watch;
  }
  return [watch];
};

const handleFetchError = (error, errorMap) => {
  if (!error) return;

  const statusCode = Number(error.message);

  if (!errorMap && statusCode === 204) {
    console.warn('status code 204에 대한 처리가 필요합니다.');
    return alert('NO_CONTENT');
  }
  if (!errorMap) return console.warn(error);

  const handler = errorMap[statusCode];
  if (typeof handler === 'string') return alert(handler);
  if (typeof handler === 'function') return handler();

  if (!handler) {
    console.warn(error);
    console.warn('errorMap에 정의하지 않은 에러입니다.');
    return alert('UNKNOWN_ERROR');
  }
};
