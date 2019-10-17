import React, { useState, useEffect } from 'react';
import './MainPage.scss';
import Header from '../../components/Header/Header';
import PostContainer from '../../components/PostContainer/PostContainer';
import useFetch from '../../hooks/useFetch';
import { WEB_SERVER_URL, VIEWPORT_HEIGHT } from '../../configs';

const MainPage = () => {
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
    const scrollY = window.scrollY;
    const documentHeight = document.body.offsetHeight; //TODO: 새로운 items를 렌더링 할 때만 값을 캐싱하도록 수정필요
    const viewportBottomPosition = VIEWPORT_HEIGHT + scrollY;
    const distanceToBottom = documentHeight - viewportBottomPosition;
    return distanceToBottom === 0;
  };

  return (
    <div className="main-page">
      <Header />
      {!loading && <PostContainer items={items} header />}
    </div>
  );
};

export default MainPage;
