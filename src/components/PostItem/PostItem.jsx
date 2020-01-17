import React from 'react';
import classNames from 'classnames/bind';
import styles from './PostItem.scss';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonLink from '../CommonLink/CommonLink';

const cx = classNames.bind(styles);

const PostItem = ({
  image,
  place,
  companion,
  activity,
  description,
  writer: { id, profileImage, nickname } = {},
  headerOn
}) => {
  const handleClick = () => {
    localStorage.setItem('targetUserId', id);
  };

  return (
    <div className={cx('wrapper')}>
      {headerOn && (
        <div className={cx('header')}>
          <CommonLink to={`/profile/@${nickname}`} onClick={handleClick}>
            <ProfileImage small src={profileImage} />
          </CommonLink>
          <CommonLink to={`/profile/@${nickname}`} onClick={handleClick}>
            <span>{nickname}</span>
          </CommonLink>
        </div>
      )}
      <img
        className={cx(headerOn ? 'img' : 'img-without-header')}
        src={image}
        alt="representative post image"
      />
      <div className={cx('title')}>
        {place}에서 {companion}랑 {activity}
      </div>
      <div className={cx('desc')}>{description}</div>
    </div>
  );
};

export default PostItem;
