import React, { useState, useMemo, useCallback, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './RelatedPost.scss';
import useFetch from '../../hooks/useFetch';
import useMediaQuerySet from '../../hooks/useMediaQuerySet';
import RelatedPostComment from './RelatedPostComment';
import { throttle } from '../../utils/utils';
import {
  TRANSITION_DURATION_TIME,
  TRANSITION_DELAY_TIME,
  WEB_SERVER_URL
} from '../../configs';

const cx = classNames.bind(styles);

const RelatedPost = ({ postId }) => {
  const { isMobile } = useMediaQuerySet();
  const [windowWidth, setWindowViewportWidth] = useState(window.innerWidth);
  //아래 계산식은 RelatedPost.scss 내에 작성된 계산식에 의존함.
  const carouselWidthOverMobile = 500; //px
  const btnSize = 20; //px
  const padding = 10; //px
  const carouselViewportWidth = useMemo(
    () =>
      isMobile
        ? windowWidth - (padding + btnSize) * 2
        : carouselWidthOverMobile,
    [windowWidth]
  );
  const updateWindowWidth = useCallback(
    throttle(() => {
      setWindowViewportWidth(window.innerWidth);
    }),
    []
  );

  const [currentActiveIndex, setCurrentActiveIndex] = useState(1);
  const [positionX, setPositionX] = useState(0);
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState(null);
  const posts = response ? response.posts : [];

  const {
    error,
    loading
  } = useFetch(
    `${WEB_SERVER_URL}/post/related-to?postid=${postId}&page=${page}`,
    {},
    json => mergeResponse(response, json)
  );

  const mergeResponse = (prevResponse, response) => {
    const isFirstFetch = prevResponse === null;
    if (isFirstFetch) return setResponse(response);
    setResponse({
      hasNextPage: response.hasNextPage,
      posts: [...prevResponse.posts, ...response.posts]
    });
  };

  const makeCarouselItem = () => {
    const items = [...posts];
    return items.map(item => {
      return (
        <RelatedPostComment
          key={item.id}
          postId={item.id}
          companion={item.companion}
          activity={item.activity}
          profileImageURL={item.writer.profileImage || ''}
        />
      );
    });
  };

  const makeCarouselJsx = () => {
    return !posts.length ? (
      <div className={cx('carousel-wrap')} style={{ margin: '0 auto' }}>
        <h3>아직 이 장소를 방문한 다른 사람이 없네요. 🥺</h3>
      </div>
    ) : (
      <div
        className={cx('carousel-wrap')}
        style={{
          transform: `translateX(${positionX}px)`,
          transition: `transform ${TRANSITION_DURATION_TIME} ease ${TRANSITION_DELAY_TIME}`
        }}
      >
        {makeCarouselItem()}
      </div>
    );
  };

  const getMaximumIndex = () => {
    return posts.length % 5 === 0
      ? parseInt(posts.length / 5)
      : parseInt(posts.length / 5) + 1;
  };

  const prevBtnHandler = () => {
    if (currentActiveIndex === 1) return;
    setCurrentActiveIndex(currentActiveIndex - 1);
    setPositionX(positionX + carouselViewportWidth);
  };

  const nextBtnHandler = () => {
    const maximumIndex = getMaximumIndex();
    if (currentActiveIndex === maximumIndex) return;
    if (response.hasNextPage && currentActiveIndex === maximumIndex - 1)
      setPage(page + 1);
    setCurrentActiveIndex(currentActiveIndex + 1);
    setPositionX(positionX - carouselViewportWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, [isMobile]);

  return (
    <div className={cx('wrapper')}>
      <hr />
      <h2 className={cx('header')}>이 장소를 방문한 사람들</h2>
      <div className={cx('carousel-area')}>
        {posts.length > 5 && (
          <button className={cx('prev-btn')} onClick={prevBtnHandler}>
            &lt;
          </button>
        )}
        <div className={cx('carousel')}>{makeCarouselJsx()}</div>
        {posts.length > 5 && (
          <button className={cx('next-btn')} onClick={nextBtnHandler}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default RelatedPost;
