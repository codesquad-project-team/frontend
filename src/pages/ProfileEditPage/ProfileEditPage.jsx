import React, { useState, useEffect } from 'react';
import './ProfileEditPage.scss';
import Header from '../../components/Header/Header';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import ProfileContentItem from '../../components/ProfileContentItem/ProfileContentItem';
import Button from 'react-bootstrap/Button';
import useInput from '../../hooks/useInput';
import useFetch from '../../hooks/useFetch';
import { WEB_SERVER_URL, MAIN_COLOR } from '../../configs';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
import CommonBtn from '../../components/CommonBtn/CommonBtn';

const ProfileEditPage = () => {
  const [inputValue, setInputValue, handleChange, restore] = useInput();
  const { profileImage, nickname, email, phone, introduction } = inputValue;

  const { loading, error } = useFetch(
    `${WEB_SERVER_URL}/user/myinfo`,
    {},
    json => initUserInfo(json)
  );

  const initUserInfo = userInfo => {
    const { profileImage, nickname, email, phone } = userInfo;
    const buf = Buffer.from(userInfo.description);
    const initialValue = {
      profileImage,
      nickname,
      email,
      phone,
      introduction: buf.toString()
    };
    setInputValue(initialValue);
  };

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
              <div className="profile-edit-page-content-item">
                <ProfileImage medium src={profileImage} />
                <CommonBtn styleType="underline">프로필 사진 바꾸기</CommonBtn>
              </div>
              <ProfileContentItem
                label="닉네임"
                value={nickname}
                name="nickname"
                changeHandler={handleChange}
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
                className="submit-btn"
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
