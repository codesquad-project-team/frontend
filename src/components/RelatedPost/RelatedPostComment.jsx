import React from 'react';
import classNames from 'classnames/bind';
import styles from './RelatedPostComment.scss';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonLink from '../CommonLink/CommonLink';

const cx = classNames.bind(styles);

const RelatedPostComment = ({
  postId,
  companion,
  activity,
  profileImageURL
}) => {
  return (
    <div className={cx('wrapper')}>
      <CommonLink to={`/post/${postId}`}>
        <ProfileImage
          medium
          src={profileImageURL}
          className={cx('profile-image')}
        />
      </CommonLink>
      <CommonLink to={`/post/${postId}`}>
        <h3 className={cx('comment')}>
          {companion}
          <br />
          {activity}
        </h3>
      </CommonLink>
    </div>
  );
};

export default RelatedPostComment;
