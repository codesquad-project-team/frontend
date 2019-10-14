import React from 'react';
import './ProfileImage.scss';
import { getClassName } from '../../utils/utils';

const ProfileImage = props => {
  const sizeClassName = getClassName({ props, prefix: 'ProfileImage' });

  return (
    <div className={`ProfileImage ${sizeClassName}`}>
      <img src="" alt="profile-image" />
    </div>
  );
};

export default ProfileImage;
