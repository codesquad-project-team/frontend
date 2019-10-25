import React, { useState, useEffect } from 'react';
import './ProfileEditPage.scss';
import Header from '../../components/Header/Header';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import ProfileContentItem from '../../components/ProfileContentItem/ProfileContentItem';
import Button from 'react-bootstrap/Button';
import useInput from '../../hooks/useInput';

const ProfileEditPage = () => {
  const [inputValue, setInputValue, handleChange, restore] = useInput();
  const { profileImage, nickname, email, phone, introduction } = inputValue;

  useEffect(() => {
    async function fetchUsefInfo(url) {
      const response = await fetch(url);
      const userInfo = await response.json();
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
    }

    fetchUsefInfo('http://13.124.93.76/user/info');
  }, []);

  return (
    <>
      <Header></Header>
      <div className="profile-edit-page-dimmed">
        <div className="profile-edit-page">
          <div className="profile-edit-page-nav">
            <div className="profile-edit-page-nav-item">프로필 편집</div>
          </div>
          <form className="profile-edit-page-content-form">
            <div className="profile-edit-page-content-item">
              <ProfileImage medium src={profileImage}></ProfileImage>
              <button>프로필 사진 바꾸기</button>
            </div>
            <ProfileContentItem
              label="닉네임"
              value={nickname}
              name="nickname"
              changeHandler={handleChange}
            ></ProfileContentItem>
            <ProfileContentItem
              label="소개"
              value={introduction}
              name="introduction"
              changeHandler={handleChange}
            ></ProfileContentItem>
            <ProfileContentItem
              label="이메일"
              value={email}
              name="email"
              changeHandler={handleChange}
            ></ProfileContentItem>
            <ProfileContentItem
              label="휴대폰 번호"
              value={phone}
              name="phone"
              changeHandler={handleChange}
            ></ProfileContentItem>
            <Button type="submit" className="submit-btn">
              제출
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileEditPage;
