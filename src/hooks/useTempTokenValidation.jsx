import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { WEB_SERVER_URL } from '../configs';

const useTempTokenValidation = history => {
  const [provider, setProvider] = useState(null);
  const postposition = provider === 'kakao' ? '로' : '으로';

  const { loading, error } = useFetch(
    `${WEB_SERVER_URL}/auth/tempToken`,
    { method: 'POST', credentials: 'include' },
    json => setProvider(json.provider)
  );

  useEffect(() => {
    if (error && error.message === '401') history.push('/');
  }, [error]);

  return { loading, provider: provider + postposition };
};

export default useTempTokenValidation;
