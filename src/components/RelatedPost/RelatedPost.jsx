import React, { useState, useEffect } from 'react';
import './RelatedPost.scss';
import useFetch from '../../hooks/useFetch';
import ProfileImage from '../ProfileImage/ProfileImage';
import RelatedPostComment from './RelatedPostComment';
import {
  TRANSITION_DURATION_TIME,
  TRANSITION_DELAY_TIME,
  WEB_SERVER_URL
} from '../../configs';

const RelatedPost = () => {
  const [data, setData] = useState([]);
  const [currentActiveIndex, setCurrentActiveIndex] = useState(1);
  const [positionX, setPositionX] = useState(0);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const { error, loading } = useFetch(
    `${WEB_SERVER_URL}/post/related-to?postid=1&page=${page}`,
    {},
    json => {
      setData(json.posts);
      setHasNextPage(json.hasNextPage);
    }
  );

  const makeCarouselItem = () => {
    const items = [...data];

    return items.map(item => {
      return (
        <RelatedPostComment
          titleCompanion={item.titleCompanion}
          titleActivity={item.titleActivity}
        />
      );
    });
  };

  const makeCarouselJsx = () => {
    const len = data.length;

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

  const getMaximamIndex = () => {
    return data.length % 5 === 0
      ? parseInt(data.length / 5)
      : parseInt(data.length / 5) + 1;
  };

  const prevBtnHandler = ({ target }) => {
    const maximamIndex = getMaximamIndex();
    if (currentActiveIndex === 1) return;
    setCurrentActiveIndex(currentActiveIndex - 1);
    setPositionX(positionX + 500);
  };

  const nextBtnHandler = ({ target }) => {
    const maximamIndex = getMaximamIndex();
    if (currentActiveIndex === maximamIndex) return;
    setCurrentActiveIndex(currentActiveIndex + 1);
    setPositionX(positionX - 500);
  };

  return (
    <div className="related-post">
      <hr />
      <h2 className="related-post-header">이 장소를 방문한 사람들</h2>

      <div className="related-post-carousel">{makeCarouselJsx()}</div>
      {data.length > 5 && (
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
