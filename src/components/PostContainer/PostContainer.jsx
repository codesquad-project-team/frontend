import React, { useState, useEffect } from 'react';
import './PostContainer.scss';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
import PostItem from '../PostItem/PostItem';
import CommonLink from '../CommonLink/CommonLink';
import useFetch from '../../hooks/useFetch';
import {
  WEB_SERVER_URL,
  VIEWPORT_HEIGHT,
  TRIGGER_POINT,
  MAIN_COLOR
} from '../../configs';
import { throttle } from '../../utils/utils';

const PostContainer = ({ headerOn, writerId = '' }) => {
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState(null);
  const items = response ? response.posts : [];

  //page - required
  //writerid - optional
  //writerid가 존재하는 경우 해당 사용자의 게시글만 받아오는 api
  const { error, loading } = useFetch(
    `${WEB_SERVER_URL}/post?page=${page}${
      writerId ? `&writerid=${writerId}` : ''
    }`,
    {},
    json => mergeResponse(response, json)
  );

  const mergeResponse = (prevResponse, response) => {
    if (page === 1) {
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
  }, [loading]);

  const handleScroll = throttle(() => {
    if (!hasNextPage(response)) return;
    if (isScrollEnd()) {
      setPage(prevPage => prevPage + 1);
    }
  });

  const hasNextPage = response => {
    return response && !response.hasNextPage;
  };

  const isScrollEnd = () => {
    const pageYOffset = window.pageYOffset;
    const documentHeight = document.body.offsetHeight; //TODO: 새로운 items를 렌더링 할 때만 값을 캐싱하도록 수정필요
    const scrollBottom = VIEWPORT_HEIGHT + pageYOffset;
    return !loading && scrollBottom + TRIGGER_POINT >= documentHeight;
  };

  const postItems = items.map(item => (
    <CommonLink to={`/post/${item.id}`} key={item.id}>
      <PostItem headerOn={headerOn} {...item} />
    </CommonLink>
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
