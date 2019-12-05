import React from 'react';
import './ProfileImageChangeBtn.scss';
import { IMAGE_BUCKET_URL } from '../../configs';

const ProfileImageChangeBtn = ({ setImage }) => {
  const handleProfileImage = ({ target }) => {
    const file = Array.from(target.files);

    const reader = new FileReader();
    reader.addEventListener('load', ({ target }) => {
      setImage({ fileType: file, previewUrl: target.result });
    });
    reader.readAsDataURL(file[0]);
  };

  return (
    <div className="profile-edit-page-image-change-wrapper">
      <img
        className="profile-edit-page-image-change-icon"
        src={`${IMAGE_BUCKET_URL}/profile-change-icon.png`}
      />
      <label
        className="profile-edit-page-image-change-label"
        htmlFor="profile-image-change-btn"
      >
        프로필 사진 바꾸기
      </label>
      <input
        id="profile-image-change-btn"
        className="profile-edit-page-image-change-btn"
        type="file"
        accept="image/*"
        onChange={handleProfileImage}
      />
    </div>
  );
};

export default ProfileImageChangeBtn;
