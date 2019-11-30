import React, { useState, useEffect } from 'react';

const useScript = scriptName => {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  let script;

  useEffect(() => {
    try {
      setLoading(true);
      script = document.createElement('script');
      script.src = `${scriptName}`;
      document.body.appendChild(script);

      script.onload = () => {
        setLoading(false);
      };

      script.onerror = () => {
        throw Error(`SCRIPT LOAD ERROR : ${scriptName}`);
      };
    } catch (error) {
      setLoadError(error);
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return { loading, loadError };
};

export default useScript;
