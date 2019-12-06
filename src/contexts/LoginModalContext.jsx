import React, { useState, useContext, createContext } from 'react';

const LoginModalContext = createContext();

export const useLoginModalContext = () => useContext(LoginModalContext);

const LoginModalContextProvider = ({ children }) => {
  const [needsLoginModal, setNeedsLoginModal] = useState(false);
  return (
    <LoginModalContext.Provider value={{ needsLoginModal, setNeedsLoginModal }}>
      {children}
    </LoginModalContext.Provider>
  );
};

export default LoginModalContextProvider;
