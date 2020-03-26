import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from './useFetch';
import api from '../api';

const useTempTokenValidation = () => {
  const history = useHistory();
  const [provider, setProvider] = useState(null);
  const postposition = provider === 'kakao' ? '로' : '으로';

  const { loading } = useFetch({
    onRequest: api.validateTempToken,
    onSuccess: json => setProvider(json.provider),
    onError: { 401: () => history.push('/') }, //유효하지 않은 토큰
    autoFetch: true,
    loadStatus: true
  });

  return { loading, provider: provider + postposition };
};

export default useTempTokenValidation;
