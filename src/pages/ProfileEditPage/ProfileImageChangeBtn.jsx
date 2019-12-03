import React from 'react';
import './ProfileImageChangeBtn.scss';

const ProfileImageChangeBtn = ({ inputValue, setInputValue }) => {
  const handleProfileImage = ({ target }) => {
    const file = Array.from(target.files);

    const reader = new FileReader();
    reader.addEventListener('load', ({ target }) => {
      setInputValue({ ...inputValue, ['profileImage']: target.result });
    });
    reader.readAsDataURL(file[0]);
  };

  return (
    <>
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
    </>
  );
};

export default ProfileImageChangeBtn;
