import React, { useCallback } from 'react';
import './ProfileImage.scss';
import { getClassName } from '../../utils/utils';

const ProfileImage = props => {
  const sizeClassName = getClassName({ props, parentClass: 'ProfileImage' });

  return (
    <div className={`ProfileImage ${sizeClassName}`}>
      <h1>ProfileImage</h1>
    </div>
  );
};

export default ProfileImage;
