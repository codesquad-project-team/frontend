import React, { useState } from 'react';
import './RelatedPost.scss';
import useFetch from '../../hooks/useFetch';
import RelatedPostComment from './RelatedPostComment';
import {
  TRANSITION_DURATION_TIME,
  TRANSITION_DELAY_TIME,
  WEB_SERVER_URL
} from '../../configs';

const RelatedPost = ({ postId }) => {
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
          companion={item.companion}
          activity={item.activity}
          profileImageURL={item.writer.profileImage || ''}
          key={item.id}
        />
      );
    });
  };

  const makeCarouselJsx = () => {
    const len = posts.length;

    {
      return !len ? (
        <div className="related-post-carousel-wrap">
          <h3>아직 이 장소를 방문한 다른 사람이 없네요. 🥺</h3>;
        </div>
      ) : (
        <div
          className="related-post-carousel-wrap"
          style={{
            transform: `translateX(${positionX}px)`,
            transition: `transform ${TRANSITION_DURATION_TIME} ease ${TRANSITION_DELAY_TIME}`
          }}
        >
          {makeCarouselItem()}
        </div>
      );
    }
  };

  const getMaximumIndex = () => {
    return posts.length % 5 === 0
      ? parseInt(posts.length / 5)
      : parseInt(posts.length / 5) + 1;
  };

  const prevBtnHandler = ({ target }) => {
    if (currentActiveIndex === 1) return;
    setCurrentActiveIndex(currentActiveIndex - 1);
    setPositionX(positionX + 500);
  };

  const nextBtnHandler = ({ target }) => {
    const maximumIndex = getMaximumIndex();
    if (currentActiveIndex === maximumIndex) return;
    if (response.hasNextPage && currentActiveIndex === maximumIndex - 1)
      setPage(page + 1);
    setCurrentActiveIndex(currentActiveIndex + 1);
    setPositionX(positionX - 500);
  };

  return (
    <div className="related-post">
      <hr />
      <h2 className="related-post-header">이 장소를 방문한 사람들</h2>

      <div className="related-post-carousel">{makeCarouselJsx()}</div>
      {posts.length > 5 && (
        <div className="related-post-carousel-btns">
          <button
            className="carousel-btns-common prev-btn"
            onClick={prevBtnHandler}
          >
            &lt;
          </button>
          <button
            className="carousel-btns-common next-btn"
            onClick={nextBtnHandler}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default RelatedPost;
