import React, { useState, useEffect } from 'react';

const useScript = scriptName => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `${scriptName}`;
    document.body.appendChild(script);

    script.onload = () => {
      setLoading(false);
    };

    script.onerror = () => {
      console.log(`Error loading : ${scriptName}`);
      setError(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return { loading, error };
};

export default useScript;
