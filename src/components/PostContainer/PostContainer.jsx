import React from 'react';
import './PostContainer.scss';
import PostItem from '../PostItem/PostItem';

const PostContainer = props => {
  const postItems = props.items.map(e => (
    <PostItem
      key={e.postId || Math.floor(Math.random() * 10000)}
      headerOn={props.header}
      {...e}
    ></PostItem>
  ));
  return (
    <div className="post-container-wrapper">
      <div className="post-container">{postItems}</div>
    </div>
  );
};

export default PostContainer;
