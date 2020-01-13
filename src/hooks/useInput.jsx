import { useState, useCallback } from 'react';

const useInput = (initialValue = {}) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = useCallback(
    ({ target }) => {
      const { name, value } = target;
      setInputValue({ ...inputValue, [name]: value });
    },
    [inputValue]
  );

  const restore = useCallback(name => {
    setInputValue({ ...inputValue, [name]: '' });
  }, []);

  return { inputValue, setInputValue, handleChange, restore };
};

export default useInput;
