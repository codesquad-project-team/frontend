import React, { useState, useContext, createContext, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import api from '../api';

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

  const handleLoginSuccess = userInfo => {
    setLoggedIn(true);
    setUserInfo(userInfo);
  };

  const { request } = useFetch({
    onRequest: api.hasLoggedIn,
    onSuccess: handleLoginSuccess,
    onError: () => setLoggedIn(false)
  });

  useEffect(() => {
    request();
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
