import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './PostContainer.scss';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
import PostItem from '../PostItem/PostItem';
import useFetch from '../../hooks/useFetch';
import { VIEWPORT_HEIGHT, TRIGGER_POINT, MAIN_COLOR } from '../../configs';
import { throttle } from '../../utils/utils';
import api from '../../api';

const cx = classNames.bind(styles);

const PostContainer = ({ headerOn, writerId = '' }) => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState(null);
  const items = response ? response.posts : null;

  const { loading } = useFetch({
    onRequest: () => api.getPosts(page, writerId),
    onSuccess: json => mergeResponse(response, json),
    onError: { 204: () => setResponse(null) },
    watch: [page, writerId],
    loadStatus: true
  });

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
    return response && response.hasNextPage;
  };

  const isScrollEnd = () => {
    const pageYOffset = window.pageYOffset;
    const documentHeight = document.body.offsetHeight; //TODO: 새로운 items를 렌더링 할 때만 값을 캐싱하도록 수정필요
    const scrollBottom = VIEWPORT_HEIGHT + pageYOffset;
    return !loading && scrollBottom + TRIGGER_POINT >= documentHeight;
  };

  const goTo = pathname => {
    history.push(pathname);
    window.scroll(0, 0);
  };

  return (
    <>
      <div className={cx('wrapper')}>
        {items ? (
          <div className={cx('main')}>
            {items.map(item => (
              <PostItem
                key={item.id}
                headerOn={headerOn}
                onClick={() => goTo(`/post/${item.id}`)}
                {...item}
              />
            ))}
          </div>
        ) : (
          <span className={cx('no-content')}>아직 작성한 게시글이 없어요.</span>
        )}
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
