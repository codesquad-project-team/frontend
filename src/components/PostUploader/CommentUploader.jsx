import React from 'react';
import './CommentUploader.scss';

const CommentUploader = () => {
  return (
    <textarea
      name="comment"
      className="comment-uploader"
      placeholder="간단한 코멘트를 남겨주세요."
    />
  );
};

export default CommentUploader;
