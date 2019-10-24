import { useState, useEffect } from 'react';

//TODO: 배포시 제거
const makeDelay = timeInMs => {
  return new Promise(res => setTimeout(res, timeInMs));
};

/**
 * @param {string} url fetch요청할 url
 * @param {Object} options fetch함수의 두번째 인자로 전달할 옵션객체
 * @param {Function} callback fetch받은 data를 상태로 저장할 setState함수
 */
const useFetch = (url, options, callback) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await makeDelay(500); //TODO: 배포시 제거
        const res = await fetch(url, options);
        if (res instanceof Promise) throw Error('REQUEST FAILED');
        if (!res.ok) throw Error(`STATUS CODE : ${res.status}`);
        const json = await res.json();
        callback(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { error, loading };
};

export default useFetch;
