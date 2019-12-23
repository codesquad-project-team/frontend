import React from 'react';
import './DetailPost.scss';
import ProfileImage from '../ProfileImage/ProfileImage';

const DetailPost = ({
  data: {
    place,
    companion,
    activity,
    description,
    writer: { id, nickname, profileImage } = {}
  }
}) => {
  return (
    <div className="detail-post">
      <h1 className="detail-post-title">
        {place}에서 {companion}랑 {activity}
      </h1>
      <div className="detail-post-content">
        <div className="detail-post-writer-img">
          <ProfileImage small src={profileImage} />
        </div>
        <div>
          <h3 className="detail-post-writer-name">{nickname}</h3>
          <p className="detail-post-desc">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
