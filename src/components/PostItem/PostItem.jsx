import React from 'react';
import './PostItem.scss';
import ProfileImage from '../ProfileImage/ProfileImage';

const PostItem = ({
  writerImageUrl,
  writerNickname,
  representativePostImage,
  titlePlace,
  titleCompanion,
  titleActivity,
  description,
  headerOn
}) => {
  const desc = Buffer.from(description).toString();
  return (
    <div className="post-item">
      {headerOn && (
        <div className="post-item-header">
          <ProfileImage small src={writerImageUrl} />
          <span>{writerNickname}</span>
        </div>
      )}
      <img className="post-item-img" src={representativePostImage} alt="" />
      <div className="post-item-title">
        {titlePlace}에서 {titleCompanion}랑 {titleActivity}
      </div>
      <div className="post-item-desc">{desc}</div>
    </div>
  );
};

export default PostItem;
