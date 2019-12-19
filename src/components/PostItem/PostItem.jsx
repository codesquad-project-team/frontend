import React from 'react';
import './PostItem.scss';
import ProfileImage from '../ProfileImage/ProfileImage';

const PostItem = ({
  image,
  place,
  companion,
  activity,
  description,
  writer: { id, profileImage, nickname } = {},
  headerOn
}) => {
  return (
    <div className="post-item">
      {headerOn && (
        <div className="post-item-header">
          <ProfileImage small src={profileImage} />
          <span>{nickname}</span>
        </div>
      )}
      <img
        className="post-item-img"
        src={image}
        alt="representative post image"
      />
      <div className="post-item-title">
        {place}에서 {companion}랑 {activity}
      </div>
      <div className="post-item-desc">{description}</div>
    </div>
  );
};

export default PostItem;
