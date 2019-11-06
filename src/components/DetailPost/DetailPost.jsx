import React from 'react';
import './DetailPost.scss';
import ProfileImage from '../ProfileImage/ProfileImage';

const DetailPost = props => {
  const {
    titleActivity,
    titleCompanion,
    titlePlace,
    writerImageURL,
    writerNickname,
    description
  } = props.data;

  const desc = Buffer.from(description).toString();

  return (
    <div className="detail-post">
      <h1 className="detail-post-title">
        {titlePlace}에서 {titleCompanion}랑 {titleActivity}
      </h1>
      <div className="detail-post-content">
        <div className="detail-post-writer-img">
          <ProfileImage small src={writerImageURL} />
        </div>
        <div>
          <h3 className="detail-post-writer-name">{writerNickname}</h3>
          <p className="detail-post-desc">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
