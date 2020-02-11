import React, { useState, useContext, createContext, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { WEB_SERVER_URL } from '../configs';

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

const LoginContextProvider = ({ children }) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(true);
  const [clickedSignup, setClickedSignup] = useState(false);
  const [clickedSignin, setClickedSignin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const { id, nickname, profileImage } = userInfo;

  const [needsUserInfo, setNeedsUserInfo] = useState(false);

  const openSigninModal = () => setClickedSignin(true);
  const closeSigninModal = () => {
    if (
      pathname === '/profile/edit' ||
      pathname === '/post/edit' ||
      pathname === '/post/upload'
    ) {
      history.push('/');
    }
    setClickedSignin(false);
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
      } else {
        setLoggedIn(false);
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
        openSigninModal,
        closeSigninModal,
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
