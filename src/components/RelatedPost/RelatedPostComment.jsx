import React from 'react';
import classNames from 'classnames/bind';
import styles from './RelatedPostComment.scss';
import ProfileImage from '../ProfileImage/ProfileImage';

const cx = classNames.bind(styles);

const RelatedPostComment = ({ companion, activity, profileImageURL }) => {
  return (
    <div className={cx('wrapper')}>
      <ProfileImage medium src={profileImageURL} />
      <h3 className={cx('comment')}>
        {companion}
        <br />
        {activity}
      </h3>
    </div>
  );
};

export default RelatedPostComment;
