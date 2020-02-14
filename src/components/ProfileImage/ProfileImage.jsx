import React from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileImage.scss';
import { getClassName } from '../../utils/utils';
import { DEFAULT_PROFILE_IMG_URL } from '../../configs';

const cx = classNames.bind(styles);

const ProfileImage = props => {
  const { className = '', src, small, medium, large, ...restProps } = props;
  const sizeClassName = getClassName(props);

  return (
    <img
      src={src || DEFAULT_PROFILE_IMG_URL}
      alt="profile-image"
      className={cx('border', sizeClassName, className)}
      {...restProps}
    />
  );
};

export default ProfileImage;
