import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from './useFetch';
import { WEB_SERVER_URL } from '../configs';

const useTempTokenValidation = () => {
  const history = useHistory();
  const [provider, setProvider] = useState(null);
  const postposition = provider === 'kakao' ? '로' : '으로';

  const { loading } = useFetch({
    URL: `${WEB_SERVER_URL}/auth/tempToken`,
    options: { method: 'POST', credentials: 'include' },
    onSuccess: json => setProvider(json.provider),
    onError: { 401: () => history.push('/') } //유효하지 않은 토큰
  });

  return { loading, provider: provider + postposition };
};

export default useTempTokenValidation;
