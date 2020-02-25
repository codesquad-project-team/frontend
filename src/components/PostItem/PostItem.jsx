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
  headerOn,
  ...props
}) => {
  const handleClick = () => {
    localStorage.setItem('targetUserId', id);
  };

  return (
    <div className={cx('wrapper')} {...props}>
      {headerOn && (
        <div className={cx('header')}>
          <CommonLink
            to={{
              pathname: `/profile/@${nickname}`,
              state: { userId: id }
            }}
            onClick={handleClick}
          >
            <ProfileImage small src={profileImage} />
          </CommonLink>
          <CommonLink
            to={{
              pathname: `/profile/@${nickname}`,
              state: { userId: id }
            }}
            onClick={handleClick}
          >
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
        {place}에서 {companion} {activity}
      </div>
      <div className={cx('desc')}>{description}</div>
    </div>
  );
};

export default PostItem;
