import React from 'react';
import ProfileImage from '../ProfileImage/ProfileImage';

const RelatedPostComment = ({ titleCompanion, titleActivity }) => {
  return (
    <div className="related-post-carousel-item">
      <h3 className="related-post-comment">
        <ProfileImage medium />
        {titleCompanion}
        <br />
        {titleActivity}
      </h3>
    </div>
  );
};

export default RelatedPostComment;
