import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.scss';
import useInput from '../../hooks/useInput';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonBtn from '../CommonBtn/CommonBtn';
import CommonModal from '../CommonModal/CommonModal';
import CommonLink from '../CommonLink/CommonLink';
import DropdownMenu from './DropdownMenu';
import useMediaQuerySet from '../../hooks/useMediaQuerySet';
import { useLoginContext } from '../../contexts/LoginContext';
import { IMAGE_BUCKET_URL } from '../../configs';

const cx = classNames.bind(styles);

const Header = () => {
  const { isMobile } = useMediaQuerySet();
  const { inputValue, handleChange, restore } = useInput();
  const [showsDropdown, setShowsDropdown] = useState(false);
  const {
    loggedIn,
    profileImage,
    clickedSignup,
    clickedSignin,
    openSigninModal,
    closeSigninModal,
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
    <>
      <div className={cx('transparent-box')} />
      <div className={cx('wrapper')}>
        <div className={cx('header')}>
          <div className={cx('title')}>
            <CommonLink to="/">
              {isMobile ? (
                <img src={`${IMAGE_BUCKET_URL}/logo.png`} />
              ) : (
                <h1>Connect Flavor</h1>
              )}
            </CommonLink>
          </div>
          {isMobile ? (
            <img
              className={cx('searchbar-icon')}
              src={`${IMAGE_BUCKET_URL}/magnifier-icon.png`}
              alt=""
            />
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={cx('searchbar-icon-wrapper')}>
                <img
                  className={cx('searchbar-icon')}
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
          )}
          <div className={cx('btns')}>
            {loggedIn ? (
              <>
                <ProfileImage
                  small
                  src={profileImage}
                  className={cx(
                    'profile-img',
                    showsDropdown && 'over-dropdown-background'
                  )}
                  onClick={toggleDropdownMenu}
                />
                {showsDropdown && <DropdownMenu onClick={toggleDropdownMenu} />}
              </>
            ) : isMobile ? (
              <img
                src={`${IMAGE_BUCKET_URL}/user-icon.png`}
                className={cx('user-icon')}
                onClick={openSigninModal}
              />
            ) : (
              <>
                <CommonBtn
                  className={cx('signin-btn')}
                  onClick={openSigninModal}
                  styleType="normal"
                >
                  로그인
                </CommonBtn>
                <CommonBtn
                  className={cx('signup-btn')}
                  onClick={toggleSignupModal}
                  styleType="normal"
                >
                  회원가입
                </CommonBtn>
              </>
            )}
          </div>

          {!loggedIn && clickedSignin && (
            <CommonModal onClose={closeSigninModal} target={'signin'} />
          )}

          {!loggedIn && clickedSignup && (
            <CommonModal onClose={toggleSignupModal} target={'signup'} />
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
