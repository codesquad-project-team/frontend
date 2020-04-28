import { useCallback } from 'react';
import { debounce } from '../utils/utils';

const useDebounce = callback => {
  return useCallback(debounce(callback), []);
};

export default useDebounce;
