import React from 'react';
import './DetailPost.scss';
import ProfileImage from '../ProfileImage/ProfileImage';

const DetailPost = props => {
  const {
    titleActivity,
    titleCompanion,
    titlePlace,
    writerImageURL,
    writerNickname
  } = props.data;

  const description = Buffer.from(props.data.description).toString();

  return (
    <div className="detail-post">
      <h1 className="detail-post-title">
        {titleCompanion}랑 {titlePlace}에서 {titleActivity}
      </h1>
      <div className="detail-post-content">
        <div className="detail-post-writer-img">
          <ProfileImage small src={writerImageURL}></ProfileImage>
        </div>
        <div>
          <h3 className="detail-post-writer-name">{writerNickname}</h3>
          <p className="detail-post-desc">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
