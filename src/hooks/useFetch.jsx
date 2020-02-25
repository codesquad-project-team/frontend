import { useState, useEffect, useCallback } from 'react';

const handleFetchError = (error, errorMap) => {
  if (!error) return;
  const value = errorMap[error.message];
  if (!value) return alert('UNKNOWN_ERROR');
  if (typeof value === 'string') return alert(value);
  if (typeof value === 'function') return value();
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
      const json = await res.json();
      callback ? callback(json) : setData(json);
    } catch (error) {
      errorMap ? handleFetchError(error, errorMap) : console.warn(error);
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
