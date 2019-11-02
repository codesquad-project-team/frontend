import { useState, useCallback } from 'react';

const useInput = () => {
  const [inputValue, setInputValue] = useState({});

  const handleChange = useCallback(({ target }) => {
    const { name, value } = target;
    setInputValue({ ...inputValue, [name]: value });
  }, []);

  const restore = useCallback(name => {
    setInputValue({ ...inputValue, [name]: '' });
  }, []);

  return { inputValue, setInputValue, handleChange, restore };
};

export default useInput;
