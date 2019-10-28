import React from 'react';
import './ProfileImage.scss';
import { getClassName } from '../../utils/utils';
import { IMAGE_BUCKET_URL } from '../../configs';

const ProfileImage = props => {
  const { className = '', src, small, medium, large, ...restProps } = props;
  const sizeClassName = getClassName({ props, prefix: 'profile-image' });

  return (
    <img
      src={src || `${IMAGE_BUCKET_URL}/blank-profile-picture.png`}
      alt="profile-image"
      className={`profile-image ${sizeClassName} ${className}`}
      {...restProps}
    />
  );
};

export default ProfileImage;
