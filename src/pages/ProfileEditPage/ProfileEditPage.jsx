import React, { useState, useEffect, useCallback, useRef } from 'react';
import './ProfileEditPage.scss';
import Header from '../../components/Header/Header';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import ProfileContentItem from '../../components/ProfileContentItem/ProfileContentItem';
import useInput from '../../hooks/useInput';
import useFetch from '../../hooks/useFetch';
import { WEB_SERVER_URL, MAIN_COLOR } from '../../configs';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
import CommonBtn from '../../components/CommonBtn/CommonBtn';
import ProfileImageChangeBtn from './ProfileImageChangeBtn';
import useScript from '../../hooks/useScript';
import ValidityMessage from '../../pages/SignupPage/ValidityMessage';
import { debounce } from '../../utils/utils';

const ProfileEditPage = () => {
  const { inputValue, setInputValue, handleChange, restore } = useInput();
  const { profileImage, nickname, email, phone, introduction } = inputValue;

  const [nicknameValidity, setNicknameValidity] = useState({});

  const [currentNickname, setCurrentNickname] = useState('');

  const { loadError } = useScript(
    'https://sdk.amazonaws.com/js/aws-sdk-2.283.1.min.js'
  );

  const { loading, error } = useFetch(
    `${WEB_SERVER_URL}/user/myinfo`,
    { credentials: 'include' },
    json => initUserInfo(json)
  );

  const initUserInfo = userInfo => {
    const { profileImage, nickname, email, phone, description } = userInfo;

    const initialValue = {
      profileImage: null || undefined,
      nickname,
      email,
      phone: null || undefined,
      introduction: description === null ? undefined : description
    };

    setCurrentNickname(initialValue.nickname);
    setInputValue(initialValue);
  };

  const checkNicknameFromServer = useCallback(async nickname => {
    const res = await fetch(`${WEB_SERVER_URL}/validate/nickname`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname })
    });
    switch (res.status) {
      case 200:
        setNicknameValidity('AVAILABLE');
        break;
      case 400:
        setNicknameValidity('HAS_BLANKS');
        break;
      case 409:
        setNicknameValidity('ALREADY_IN_USE');
        break;
      case 500:
        setNicknameValidity('SERVER_ERROR');
        break;
      default:
        break;
    }
  }, []);

  const checkNicknameValidation = useCallback(
    debounce(nickname => {
      const isValid = /^[A-Za-z][A-Za-z0-9_-]{3,14}$/.test(nickname);
      const hasBlank = /\s/.test(nickname);
      const onlyOneCharacter = nickname.length === 1;
      const sameNickname = nickname === currentNickname;
      switch (true) {
        case isValid:
          checkNicknameFromServer(nickname);
          break;
        case hasBlank:
          setNicknameValidity('HAS_BLANKS');
          break;
        case onlyOneCharacter:
          setNicknameValidity('NO_MESSAGE');
          break;
        default:
          setNicknameValidity('INFO_MESSAGE');
          break;
      }
    }),
    []
  );

  useEffect(() => {
    if (nickname) {
      nickname === currentNickname
        ? setNicknameValidity('CURRENT_NICKNAME')
        : checkNicknameValidation(nickname);
    } else {
      setNicknameValidity('');
    }
  }, [nickname]);

  return (
    <>
      <Header />
      <div className="profile-edit-page-dimmed-background">
        <div className="profile-edit-page">
          <div className="profile-edit-page-nav">
            <div className="profile-edit-page-nav-item">프로필 편집</div>
          </div>
          <FadeLoader
            css={override}
            sizeUnit={'px'}
            size={150}
            color={MAIN_COLOR}
            loading={loading}
          />
          {!loading && (
            <form className="profile-edit-page-content-form">
              <div className="profile-edit-page-content-item profile-image-section">
                <ProfileImage large src={profileImage} />
                <ProfileImageChangeBtn
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
              </div>
              <ProfileContentItem
                label="닉네임"
                value={nickname}
                name="nickname"
                changeHandler={handleChange}
                nicknameValidity={nicknameValidity}
              />
              <ProfileContentItem
                label="소개"
                value={introduction}
                name="introduction"
                changeHandler={handleChange}
              />
              <ProfileContentItem
                label="이메일"
                value={email}
                name="email"
                changeHandler={handleChange}
              />
              <ProfileContentItem
                label="휴대폰 번호"
                value={phone}
                name="phone"
                changeHandler={handleChange}
              />
              <CommonBtn
                className="profile-edit-page-submit-btn"
                type="submit"
                styleType="emphasize"
              >
                제출
              </CommonBtn>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileEditPage;

const override = css`
  display: block;
  margin: 17rem auto;
`;
