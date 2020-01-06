import React, { useState, useContext, createContext, useEffect } from 'react';
import { WEB_SERVER_URL } from '../configs';

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

const LoginContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const { id, nickname, profileImage } = userInfo;

  useEffect(() => {
    (async () => {
      const res = await fetch(`${WEB_SERVER_URL}/auth/has-logged-in`, {
        credentials: 'include'
      });
      if (res.ok) {
        setLoggedIn(true);
        setUserInfo(await res.json());
      }
    })();
  }, []);

  return (
    <LoginContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        id,
        nickname,
        profileImage,
        setUserInfo
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
