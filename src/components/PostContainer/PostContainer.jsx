import React from 'react';
import './PostContainer.scss';
import { Link } from 'react-router-dom';
import PostItem from '../PostItem/PostItem';

const PostContainer = ({ items, header }) => {
  const postItems = (items || []).map(item => (
    <Link
      to={{ pathname: `/post/${item.postId}`, postId: item.postId }}
      key={item.postId || Math.floor(Math.random() * 10000)}
    >
      <PostItem headerOn={header} {...item}></PostItem>
    </Link>
  ));
  return (
    <div className="post-container-wrapper">
      <div className="post-container">{postItems}</div>
    </div>
  );
};

export default PostContainer;
