import React, { useState, useEffect } from 'react';

const useScript = scriptPath => {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const script = document.createElement('script');
    script.src = `${scriptPath}`;
    document.body.appendChild(script);

    script.onload = () => {
      setLoading(false);
    };

    script.onerror = () => {
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
