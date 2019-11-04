import React, { useState } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonBtn from '../CommonBtn/CommonBtn';
import CommonModal from '../CommonModal/CommonModal';
import { IMAGE_BUCKET_URL } from '../../configs';

const isLoggedIn = true; //TODO: 로그인 기능 구현시 수정

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
    <div className="header-wrapper">
      <div className="header">
        <h1>Connect Flavor</h1>
        <form onSubmit={handleSubmit}>
          <div className="header-searchbar-icon-wrapper">
            <img
              className="header-searchbar-icon"
              src={`${IMAGE_BUCKET_URL}/magnifier-icon.png`}
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
            <Link to={`/profile`}>
              <ProfileImage small />
            </Link>
          ) : (
            <>
              <CommonBtn
                className="signin-btn"
                onClick={handleSignin}
                styleType="normal"
              >
                로그인
              </CommonBtn>
              <CommonBtn
                className="signup-btn"
                onClick={handleSignup}
                styleType="normal"
              >
                회원가입
              </CommonBtn>
            </>
          )}
        </div>

        {!isLoggedIn && clickedSignin && (
          <CommonModal clickHandler={handleSignin} target={'signin'} />
        )}

        {!isLoggedIn && clickedSignup && (
          <CommonModal clickHandler={handleSignup} target={'signup'} />
        )}
      </div>
    </div>
  );
};

export default Header;
