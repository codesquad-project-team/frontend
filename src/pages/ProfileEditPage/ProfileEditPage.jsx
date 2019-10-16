import React from 'react';
import './ProfileEditPage.scss';
import Header from '../../components/Header/Header';
import ProfileImage from '../../components/ProfileImage/ProfileImage';

const ProfileEditPage = () => {
  return (
    <>
      <Header></Header>
      <div className="profile-edit-page">
        <div className="profile-edit-page-nav">
          <div className="profile-edit-page-nav-item">프로필 편집</div>
        </div>
        <div className="profile-edit-page-content">
          <div className="profile-edit-page-content-item">
            <ProfileImage medium></ProfileImage>
            <button>프로필 사진 바꾸기</button>
          </div>
          <div className="profile-edit-page-content-item">
            <label>닉네임</label>
            <input type="text" />
          </div>
          <div className="profile-edit-page-content-item">
            <label>이메일 또는 휴대폰 번호</label>
            <input type="text" />
          </div>
          <div className="profile-edit-page-content-item">
            <label>소개</label>
            <input type="text" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEditPage;
