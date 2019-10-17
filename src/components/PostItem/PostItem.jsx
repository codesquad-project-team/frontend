import React from 'react';
import './PostItem.scss';

const PostItem = props => {
  return (
    <div className="post-item">
      <img src={props.url} alt="" />
      {props.children}
    </div>
  );
};

export default PostItem;
