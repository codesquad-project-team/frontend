import React from 'react';
import './PostItem.scss';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonLink from '../CommonLink/CommonLink';

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
    <div className="post-item">
      {headerOn && (
        <div className="post-item-header">
          <CommonLink to={`/profile/@${nickname}`} onClick={handleClick}>
            <ProfileImage small src={profileImage} />
          </CommonLink>
          <CommonLink to={`/profile/@${nickname}`} onClick={handleClick}>
            <span>{nickname}</span>
          </CommonLink>
        </div>
      )}
      <img
        className={`${
          headerOn ? 'post-item-img' : 'post-item-img-without-header'
        }`}
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
