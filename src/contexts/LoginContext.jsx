import React, { useState, useContext, createContext, useEffect } from 'react';
import { WEB_SERVER_URL } from '../configs';

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

const LoginContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [clickedSignup, setClickedSignup] = useState(false);
  const [clickedSignin, setClickedSignin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const { id, nickname, profileImage } = userInfo;

  const [needsUserInfo, setNeedsUserInfo] = useState(false);

  const handleSigninModal = type => {
    switch (type) {
      case 'OPEN':
        setClickedSignin(true);
        break;
      case 'CLOSE':
        setClickedSignin(false);
        break;
      default:
        setClickedSignin(!clickedSignin);
        break;
    }
  };

  const toggleSignupModal = () => {
    setClickedSignup(!clickedSignup);
  };

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
  }, [needsUserInfo]);

  return (
    <LoginContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        id,
        nickname,
        profileImage,
        clickedSignup,
        clickedSignin,
        handleSigninModal,
        toggleSignupModal,
        setUserInfo,
        setNeedsUserInfo
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
