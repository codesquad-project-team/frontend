import React from 'react';
import ProfileImage from '../ProfileImage/ProfileImage';
import './RelatedPostComment.scss';

const RelatedPostComment = ({
  titleCompanion,
  titleActivity,
  profileImageURL
}) => {
  return (
    <div className="related-post-carousel-item">
      <ProfileImage medium src={profileImageURL} />
      <h3 className="related-post-comment">
        {titleCompanion}
        <br />
        {titleActivity}
      </h3>
    </div>
  );
};

export default RelatedPostComment;
