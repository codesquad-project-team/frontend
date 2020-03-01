import { useState, useEffect, useCallback } from 'react';

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
 * 기본적으로 URL이 변경될 때마다 요청을 보냅니다.
 * 모든 인자는 객체의 프로퍼티로 전달해야 합니다.
 * @param {{URL: string, options: Object, callback: Function, needsJson: boolean}} object
 * @property {string} URL - fetch요청할 URL
 * @property {Object} options - fetch함수의 두번째 인자로 전달할 옵션객체
 * @property {Function} callback - response status가 200번대인 경우 실행할 콜백함수(204제외).
 *   needsJson이 true인 경우 json객체를 인자로 전달받습니다.
 * @property {Object} errorMap - fetch과정에서 발생하는 에러를 핸들링할 함수를 매핑한 객체.
 * @property {boolean} needsJson - response.json()이 필요없는 경우 false. 기본값은 true.
 *   이 값이 false이면 useFetch가 호출될 때 자동으로 fetch를 실행하지 않습니다.
 *   useFetch()에서 리턴되는 requestFetch함수를 이용해 fetch를 실행할 수 있습니다.
 * @returns {Object} {data: (json data), loading: (Boolean), requestFetch: (Function)}
 */
const useFetch = ({ URL, options, callback, errorMap, needsJson = true }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const requestFetch = async () => {
    try {
      setLoading(true);
      const res = await fetch(URL, options);
      if (res instanceof Promise) throw Error('REQUEST FAILED');
      if (!res.ok) throw Error(res.status);
      if (res.status === 204) throw Error(res.status); //request success but no content

      if (needsJson) {
        const json = await res.json();
        callback ? callback(json) : setData(json);
      } else {
        callback && callback();
      }
    } catch (error) {
      handleFetchError(error, errorMap);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!needsJson) return;
    requestFetch();
  }, [URL]);

  return { data, loading, requestFetch };
};

export default useFetch;
