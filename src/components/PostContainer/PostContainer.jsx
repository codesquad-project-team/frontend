import React from 'react';
import './PostContainer.scss';
import PostItem from '../PostItem/PostItem';

const PostContainer = props => {
  const postItems = props.items.map(e => (
    <PostItem key={e.id || Math.floor(Math.random() * 9999)}>
      {e.title || 'title'}
    </PostItem>
  ));
  return (
    <div className="post-container-wrapper">
      <div className="post-container">{postItems}</div>
    </div>
  );
};

export default PostContainer;
