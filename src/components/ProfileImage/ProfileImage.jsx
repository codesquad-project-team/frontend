import React from 'react';
import './ProfileImage.scss';
import { getClassName } from '../../utils/utils';
import { DEFAULT_PROFILE_IMG_URL } from '../../configs';

const ProfileImage = props => {
  const sizeClassName = getClassName({ props, prefix: 'ProfileImage' });

  return (
    <img
      src={props.src || DEFAULT_PROFILE_IMG_URL}
      alt="profile-image"
      className={`ProfileImage ${sizeClassName}`}
    />
  );
};

export default ProfileImage;
