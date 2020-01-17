import React from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileImageChangeBtn.scss';
import { IMAGE_BUCKET_URL } from '../../configs';

const cx = classNames.bind(styles);

const ProfileImageChangeBtn = ({ setImage, setInitialPageEnter }) => {
  const handleProfileImage = ({ target }) => {
    const file = Array.from(target.files);

    const reader = new FileReader();
    reader.addEventListener('load', ({ target }) => {
      setImage({ fileData: file, previewUrl: target.result });
      setInitialPageEnter(false);
    });
    reader.readAsDataURL(file[0]);
  };

  return (
    <div className={cx('wrapper')}>
      <img
        className={cx('icon')}
        src={`${IMAGE_BUCKET_URL}/profile-change-icon.png`}
      />
      <label className={cx('label')} htmlFor="profile-image-change-btn">
        프로필 사진 바꾸기
      </label>
      <input
        id="profile-image-change-btn"
        className={cx('btn')}
        type="file"
        accept="image/*"
        onChange={handleProfileImage}
      />
    </div>
  );
};

export default ProfileImageChangeBtn;
