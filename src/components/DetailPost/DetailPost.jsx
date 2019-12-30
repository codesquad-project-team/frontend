import React from 'react';
import './DetailPost.scss';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonLink from '../CommonLink/CommonLink';

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
        <CommonLink
          to={`/profile/@${nickname}`}
          onClick={() => localStorage.setItem('targetUserId', id)}
          className="detail-post-writer-img"
        >
          <ProfileImage small src={profileImage} />
        </CommonLink>
        <div>
          <CommonLink
            to={`/profile/@${nickname}`}
            onClick={() => localStorage.setItem('targetUserId', id)}
            className="detail-post-writer-name"
          >
            {nickname}
          </CommonLink>
          <p className="detail-post-desc">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
