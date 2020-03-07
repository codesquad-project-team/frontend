import { useState, useEffect } from 'react';

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

/**
 * fetch를 이용해 리소스를 요청하고 응답을 받습니다.
 * 2가지 방법으로 사용할 수 있습니다.
 * 1) URL 프로퍼티를 사용하는 방법
 * 2) onFetch 프로퍼티를 사용하는 방법
 * @param {{URL: string, options: Object, onFetch: Function, onSuccess: Function, onError: Object}} object
 * @property {string} URL - fetch요청할 URL
 * @property {Object} options - fetch함수의 두번째 인자로 전달할 옵션객체
 * @property {Function} onFetch - 요청을 보내기위해 실행할 함수. onSuccess함수에 전달할 값을 리턴합니다.
 * @property {Function} onSuccess - response status가 200번대인 경우 실행할 콜백함수(204제외).
 *   URL 프로퍼티가 존재하는 경우 json객체를 인자로 전달받습니다.
 * @property {Object} onError - fetch과정에서 발생하는 에러를 핸들링할 함수를 매핑한 객체.
 * @returns {Object} {data: (json data), loading: (boolean), requestFetch: (Function)}
 *
 * @example
 * const { loading } = useFetch({
 *   URL: 'example.com/user/info',
 *   options: { credentials: 'include' },
 *   onSuccess: json => initUserInfo(json)
 * });
 *
 * @example
 * const setUpdatedUserInfo = async () => await fetch('example.com');
 * const { requestFetch } = useFetch({
 *   onFetch: sendUpdatedUserInfo,
 *   onSuccess: handleUpdateSuccess,
 *   onError: {
 *     204: () => setUserInfo(null),
 *     401: '인증되지 않은 토큰입니다.',
 *     500: '서버에서 문제가 발생했어요. 잠시 후에 다시 시도해주세요.'
 *   }
 * });
 */
const useFetch = ({ URL, options, onFetch, onSuccess, onError }) => {
  if (URL && onFetch) console.warn('URL과 onFetch 중 하나만 사용해주세요.');

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const requestFetch = async param => {
    try {
      setLoading(true);
      const res = await (onFetch ? onFetch(param) : fetch(URL, options));

      if (res instanceof Promise) throw Error('REQUEST FAILED'); //서버로부터 응답 자체를 받지 못한 경우.
      if (!res.ok) throw Error(res.status);
      if (res.status === 204) throw Error(res.status); //request success but no content

      const response = onFetch ? res : await res.json();
      onSuccess ? onSuccess(response) : setData(response);
    } catch (error) {
      handleFetchError(error, onError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!URL) return;
    requestFetch();
  }, [URL]);

  return { data, loading, requestFetch };
};

export default useFetch;
