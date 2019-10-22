import React, { useState } from 'react';
import './Header.scss';
import useInput from '../../hooks/useInput';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonBtn from './CommonBtn';
import CommonModal from '../CommonModal/CommonModal';

const isLoggedIn = false; //TODO: 로그인 기능 구현시 수정

const Header = () => {
  const [inputValue, handleChange, restore] = useInput();
  const [clickedSignup, setClickedSignup] = useState(false);
  const [clickedSignin, setClickedSignin] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    restore('searchBar');
  };

  const handleSignin = () => {
    clickedSignin ? setClickedSignin(false) : setClickedSignin(true);
  };

  const handleSignup = () => {
    clickedSignup ? setClickedSignup(false) : setClickedSignup(true);
  };

  return (
    <div className="header">
      <h1>Connect Flavor</h1>
      <form onSubmit={handleSubmit}>
        <div className="header-searchbar-icon-wrapper">
          <img
            className="header-searchbar-icon"
            src="./resources/magnifier_icon.png"
            alt=""
          />
        </div>
        <input
          name="searchBar"
          value={inputValue.searchBar}
          onChange={handleChange}
        />
      </form>
      <div className="header-btns">
        {isLoggedIn ? (
          <ProfileImage small />
        ) : (
          <>
            <CommonBtn className="signin-btn" onClick={handleSignin}>
              로그인
            </CommonBtn>
            <CommonBtn className="signup-btn" onClick={handleSignup}>
              회원가입
            </CommonBtn>
          </>
        )}
      </div>

      {!isLoggedIn && clickedSignin && (
        <CommonModal
          clickHandler={handleSignin}
          target={'signin'}
        ></CommonModal>
      )}

      {!isLoggedIn && clickedSignup && (
        <CommonModal
          clickHandler={handleSignup}
          target={'signup'}
        ></CommonModal>
      )}
    </div>
  );
};

export default Header;
