import React from 'react';
import './PostContainer.scss';
import { Link } from 'react-router-dom';
import PostItem from '../PostItem/PostItem';

const PostContainer = ({ items, header }) => {
  const postItems = (items || []).map(e => (
    <Link
      to={`/post/${e.postId}`}
      key={e.postId || Math.floor(Math.random() * 10000)}
    >
      <PostItem headerOn={header} {...e}></PostItem>
    </Link>
  ));
  return (
    <div className="post-container-wrapper">
      <div className="post-container">{postItems}</div>
    </div>
  );
};

export default PostContainer;
