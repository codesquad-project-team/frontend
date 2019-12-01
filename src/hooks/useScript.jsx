import React, { useState, useEffect } from 'react';

const useScript = scriptName => {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  let script;

  useEffect(() => {
    setLoading(true);
    script = document.createElement('script');
    script.src = `${scriptName}`;
    document.body.appendChild(script);

    script.onload = () => {
      setLoading(false);
    };

    script.onerror = () => {
      console.log(`AWS S3 SCRIPT LOAD ERROR`);
      document.body.removeChild(script);
      setLoading(false);
      setLoadError(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return { loadError };
};

export default useScript;
