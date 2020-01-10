import React, { useState, useMemo } from 'react';
import './Header.scss';
import useInput from '../../hooks/useInput';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonBtn from '../CommonBtn/CommonBtn';
import CommonModal from '../CommonModal/CommonModal';
import CommonLink from '../CommonLink/CommonLink';
import DropdownMenu from './DropdownMenu';
import { useLoginContext } from '../../contexts/LoginContext';
import { IMAGE_BUCKET_URL } from '../../configs';

const Header = () => {
  const { inputValue, handleChange, restore } = useInput();
  const [showsDropdown, setShowsDropdown] = useState(false);
  const {
    loggedIn,
    profileImage,
    clickedSignup,
    clickedSignin,
    handleSigninModal,
    toggleSignupModal
  } = useLoginContext();

  const handleSubmit = e => {
    e.preventDefault();
    restore('searchBar');
  };

  const toggleDropdownMenu = () => {
    setShowsDropdown(state => !state);
  };

  return (
    <div className="header-wrapper">
      <div className="header">
        <div className="header-title">
          <CommonLink to="/">
            <h1>Connect Flavor</h1>
          </CommonLink>
        </div>
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
          {loggedIn ? (
            <>
              <ProfileImage
                small
                src={profileImage}
                className={`header-profile-img ${showsDropdown &&
                  'over-dropdown-background'}`}
                onClick={toggleDropdownMenu}
              />
              {showsDropdown && <DropdownMenu onClick={toggleDropdownMenu} />}
            </>
          ) : (
            <>
              <CommonBtn
                className="signin-btn"
                onClick={handleSigninModal}
                styleType="normal"
              >
                로그인
              </CommonBtn>
              <CommonBtn
                className="signup-btn"
                onClick={toggleSignupModal}
                styleType="normal"
              >
                회원가입
              </CommonBtn>
            </>
          )}
        </div>

        {!loggedIn && clickedSignin && (
          <CommonModal clickHandler={handleSigninModal} target={'signin'} />
        )}

        {!loggedIn && clickedSignup && (
          <CommonModal clickHandler={toggleSignupModal} target={'signup'} />
        )}
      </div>
    </div>
  );
};

export default Header;
