import React from 'react';
import classNames from 'classnames/bind';
import styles from './DetailPost.scss';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonLink from '../CommonLink/CommonLink';

const cx = classNames.bind(styles);

const DetailPost = ({
  data: {
    post: { place, companion, activity, description } = {},
    writer: { id, nickname, profileImage } = {}
  }
}) => {
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>
        {place}에서 {companion} {activity}
      </h1>
      <div className={cx('content')}>
        <CommonLink
          to={`/profile/@${nickname}`}
          onClick={() => localStorage.setItem('targetUserId', id)}
          className={cx('writer-img')}
        >
          <ProfileImage
            small
            className={cx('profile-image')}
            src={profileImage}
          />
        </CommonLink>
        <div>
          <CommonLink
            to={`/profile/@${nickname}`}
            onClick={() => localStorage.setItem('targetUserId', id)}
            className={cx('writer-name')}
          >
            {nickname}
          </CommonLink>
          <p className={cx('desc')}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
