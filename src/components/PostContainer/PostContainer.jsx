import React, { useState, useEffect } from 'react';
import './PostContainer.scss';
import { Link } from 'react-router-dom';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
import PostItem from '../PostItem/PostItem';
import useFetch from '../../hooks/useFetch';
import { WEB_SERVER_URL, VIEWPORT_HEIGHT, MAIN_COLOR } from '../../configs';

const PostContainer = ({ headerOn }) => {
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState(null);
  const items = response ? response.posts : [];

  const { error, loading } = useFetch(
    `${WEB_SERVER_URL}/post?page=${page}`,
    {},
    json => mergeResponse(response, json)
  );

  const mergeResponse = (prevResponse, response) => {
    const isFirstFetch = prevResponse === null;
    if (isFirstFetch) {
      return setResponse(response);
    }
    return setResponse({
      hasNextPage: response.hasNextPage,
      posts: [...prevResponse.posts, ...response.posts]
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [response]);

  const handleScroll = () => {
    if (hasNoMorePage(response)) return;
    if (isScrollEnd()) {
      setPage(() => page + 1);
    }
  };

  const hasNoMorePage = response => {
    return response && !response.hasNextPage;
  };

  const isScrollEnd = () => {
    const pageYOffset = window.pageYOffset;
    const documentHeight = document.body.offsetHeight; //TODO: 새로운 items를 렌더링 할 때만 값을 캐싱하도록 수정필요
    const viewportBottomPosition = VIEWPORT_HEIGHT + pageYOffset;
    const distanceToBottom = documentHeight - viewportBottomPosition;
    return distanceToBottom === 0;
  };

  const postItems = items.map(item => (
    <Link to={`/post/${item.postId}`} key={item.postId}>
      <PostItem headerOn={headerOn} {...item}></PostItem>
    </Link>
  ));

  return (
    <>
      <div className="post-container-wrapper">
        <div className="post-container">{postItems}</div>
      </div>
      <FadeLoader
        css={override}
        sizeUnit={'px'}
        size={150}
        color={MAIN_COLOR}
        loading={loading}
      />
    </>
  );
};

export default PostContainer;

const override = css`
  display: block;
  margin: 10rem auto;
`;
