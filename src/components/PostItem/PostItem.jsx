import React from 'react';
import './PostItem.scss';

const PostItem = props => {
  return (
    <div className="post-item" {...props}>
      {props.children}
    </div>
  );
};

export default PostItem;
