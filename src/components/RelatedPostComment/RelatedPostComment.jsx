import React from 'react';
import './RelatedPostComment.scss';
import ProfileImage from '../ProfileImage/ProfileImage';

const RelatedPostComment = ({ titleCompanion, titleActivity }) => {
  return (
    <div className="related-post-carousel-item">
      <h3 className="related-post-comment">
        <ProfileImage medium></ProfileImage>
        {titleCompanion}
        <br />
        {titleActivity}
      </h3>
    </div>
  );
};

export default RelatedPostComment;
