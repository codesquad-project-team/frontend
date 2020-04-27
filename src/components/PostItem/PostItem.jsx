import React from 'react';
import classNames from 'classnames/bind';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonLink from '../CommonLink/CommonLink';
import { profilePage } from '../../utils/utils';
import styles from './PostItem.scss';
import PostImage from './PostImage';

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
  return (
    <div className={cx('wrapper')} {...props}>
      {headerOn && (
        <div className={cx('header')}>
          <CommonLink to={profilePage(nickname, id)}>
            <ProfileImage small src={profileImage} />
          </CommonLink>
          <CommonLink to={profilePage(nickname, id)}>
            <span>{nickname}</span>
          </CommonLink>
        </div>
      )}
      <PostImage src={image} headerOn={headerOn} />
      <div className={cx('title')}>
        {place}에서 {companion} {activity}
      </div>
      <div className={cx('desc')}>{description}</div>
    </div>
  );
};

export default PostItem;
