import React, { useState, useEffect } from 'react';
import './ProfileEditPage.scss';
import Header from '../../components/Header/Header';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import Button from 'react-bootstrap/Button';
import useInput from '../../hooks/useInput';

const ProfileEditPage = () => {
  const [inputValue, setInputValue, handleChange, restore] = useInput();
  const { profileImage, nickname, email, phone, introduction } = inputValue;

  useEffect(() => {
    async function fetchUsefInfo(url) {
      const response = await fetch(url);
      const userInfo = await response.json();
      const { ProfileImage, nickname, email, phone } = userInfo;
      const buf = Buffer.from(userInfo.description);
      const initialValue = {
        profileimage: ProfileImage,
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
      <div className="profile-edit-page">
        <div className="profile-edit-page-nav">
          <div className="profile-edit-page-nav-item">프로필 편집</div>
        </div>
        <form className="profile-edit-page-content">
          <div className="profile-edit-page-content-item">
            <ProfileImage medium></ProfileImage>
            <button>프로필 사진 바꾸기</button>
          </div>
          <div className="profile-edit-page-content-item">
            <label>닉네임</label>
            <input
              type="text"
              name="nickname"
              value={nickname}
              onChange={handleChange}
            />
          </div>
          <div className="profile-edit-page-content-item">
            <label>소개</label>
            <input
              type="text"
              name="introduction"
              value={introduction}
              onChange={handleChange}
            />
          </div>
          <div className="profile-edit-page-content-item">
            <label>이메일</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="profile-edit-page-content-item">
            <label>휴대폰 번호</label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={handleChange}
            />
          </div>
          <Button variant="primary" size="lg" className="btn-submit">
            제출
          </Button>
        </form>
      </div>
    </>
  );
};

export default ProfileEditPage;
