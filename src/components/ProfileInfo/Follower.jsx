import React from 'react';
import classNames from 'classnames/bind';
import CommonLink from '../CommonLink/CommonLink';
import ProfileImage from '../ProfileImage/ProfileImage';
import styles from './Follower.scss';

const cx = classNames.bind(styles);

const Follower = ({ id, nickname, profileImage }) => {
  const handleClick = () => localStorage.setItem('targetUserId', id);

  return (
    <div className={cx('wrapper')}>
      <CommonLink
        to={`/profile/@${nickname}`}
        onClick={handleClick}
        className={cx('link')}
      >
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
