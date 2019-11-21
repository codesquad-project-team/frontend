import React, { useState, useContext, createContext } from 'react';

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

const LoginContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
