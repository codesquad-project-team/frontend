import React, { useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.scss';
import useInput from '../../hooks/useInput';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonBtn from '../CommonBtn/CommonBtn';
import CommonModal from '../CommonModal/CommonModal';
import CommonLink from '../CommonLink/CommonLink';
import DropdownMenu from './DropdownMenu';
import { useLoginContext } from '../../contexts/LoginContext';
import { useLoginModalContext } from '../../contexts/LoginModalContext';
import { IMAGE_BUCKET_URL } from '../../configs';

const cx = classNames.bind(styles);

const Header = () => {
  const { inputValue, handleChange, restore } = useInput();
  const [clickedSignup, setClickedSignup] = useState(false);
  const [clickedSignin, setClickedSignin] = useState(false);
  const [showsDropdown, setShowsDropdown] = useState(false);
  const { loggedIn, profileImage } = useLoginContext();
  const {
    needsLoginModal: needsSigninModal,
    setNeedsLoginModal: setNeedsSigninModal
  } = useLoginModalContext();

  const handleSubmit = e => {
    e.preventDefault();
    restore('searchBar');
  };

  const handleSigninModal = type => {
    switch (type) {
      case 'OPEN':
        setClickedSignin(true);
        setNeedsSigninModal(false);
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

  const toggleDropdownMenu = () => {
    setShowsDropdown(state => !state);
  };

  useMemo(() => {
    needsSigninModal ? handleSigninModal('OPEN') : null;
  }, [needsSigninModal]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('title')}>
          <CommonLink to="/">
            <h1>Connect Flavor</h1>
          </CommonLink>
        </div>
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
          ) : (
            <>
              <CommonBtn
                className={cx('signin-btn')}
                onClick={handleSigninModal}
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
