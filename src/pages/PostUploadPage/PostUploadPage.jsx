import React from 'react';
import './PostUploadPage.scss';

const PostUploadPage = () => {
  return (
    <div className="post-upload-page">
      <input type="file" />
      <input type="text" placeholder="어디에서" />
      <input type="text" placeholder="누구랑" />
      <input type="text" placeholder="뭐하기" />
      <textarea name="comment" id="" cols="30" rows="10"></textarea>
    </div>
  );
};

export default PostUploadPage;
