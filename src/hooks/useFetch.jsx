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
    console.warn('errorMap에 정의하지 않은 에러입니다.');
    return alert('UNKNOWN_ERROR');
  }
};

/**
 * 모든 인자는 객체의 프로퍼티로 전달해야 합니다.
 * {URL, options, callback, errorMap}
 * @param {string} URL fetch요청할 URL
 * @param {Object} options fetch함수의 두번째 인자로 전달할 옵션객체
 * @param {Function} callback fetch받은 data를 상태로 저장할 setState함수
 * @returns {Object} {data: json data, loading: {boolean}, refetch: {function}}
 */
const useFetch = ({ URL, options = {}, callback, errorMap }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(URL, options);
      if (res instanceof Promise) throw Error('REQUEST FAILED');
      if (!res.ok) throw Error(res.status);
      if (res.status === 204) throw Error(res.status); //request success but no content
      const json = await res.json();
      callback ? callback(json) : setData(json);
    } catch (error) {
      handleFetchError(error, errorMap);
    } finally {
      setLoading(false);
    }
  }, [URL]);

  useEffect(() => {
    fetchData();
  }, [URL]);

  return { data, loading, refetch: fetchData };
};

export default useFetch;
