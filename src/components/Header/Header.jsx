import React from 'react';
import './Header.scss';
import useInput from '../../hooks/useInput';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonBtn from './CommonBtn';

const isLoggedIn = true; //TODO: 로그인 기능 구현시 수정

const Header = () => {
  const [inputValue, handleChange, restore] = useInput();

  const handleSubmit = e => {
    e.preventDefault();
    restore('searchBar');
  };

  return (
    <div className="header">
      <h1>Logo</h1>
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
            <CommonBtn>로그인</CommonBtn>
            <CommonBtn>회원가입</CommonBtn>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
