import React from 'react';
import classNames from 'classnames/bind';
import CommonLink from '../CommonLink/CommonLink';
import ProfileImage from '../ProfileImage/ProfileImage';
import { profilePage } from '../../utils/utils';
import styles from './Follower.scss';

const cx = classNames.bind(styles);

const Follower = ({ id, nickname, profileImage }) => {
  return (
    <div className={cx('wrapper')}>
      <CommonLink to={profilePage(nickname, id)} className={cx('link')}>
        <ProfileImage
          small
          src={profileImage}
          className={cx('profile-image')}
        />
        <span>{nickname}</span>
      </CommonLink>
    </div>
  );
};

export default Follower;
