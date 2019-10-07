import React, { useState } from 'react';
import './RelatedPost.scss';
import ProfileImage from '../ProfileImage/ProfileImage';
import parse from 'html-react-parser';

const RelatedPost = () => {
  const [carouselVisible, setCarouselVisible] = useState(true);

  const [datas, setDatas] = useState([
    {
      profileUrl: 'https://avatars0.githubusercontent.com/u/18614517?s=460&v=4',
      titleCompanion: '친구랑',
      titleActivity: '코딩하기',
      postId: 1
    },
    {
      profileUrl: 'https://avatars0.githubusercontent.com/u/18614517?s=460&v=4',
      titleCompanion: '친구랑',
      titleActivity: '코딩하기',
      postId: 1
    },
    {
      profileUrl: 'https://avatars0.githubusercontent.com/u/18614517?s=460&v=4',
      titleCompanion: '친구랑',
      titleActivity: '코딩하기',
      postId: 1
    },
    {
      profileUrl: 'https://avatars0.githubusercontent.com/u/18614517?s=460&v=4',
      titleCompanion: '친구랑',
      titleActivity: '코딩하기',
      postId: 1
    },
    {
      profileUrl: 'https://avatars0.githubusercontent.com/u/18614517?s=460&v=4',
      titleCompanion: '친구랑',
      titleActivity: '코딩하기',
      postId: 1
    },
    {
      profileUrl: 'https://avatars0.githubusercontent.com/u/18614517?s=460&v=4',
      titleCompanion: '친구랑',
      titleActivity: '코딩하기',
      postId: 1
    },
    {
      profileUrl: 'https://avatars0.githubusercontent.com/u/18614517?s=460&v=4',
      titleCompanion: '친구랑',
      titleActivity: '코딩하기',
      postId: 1
    },
    {
      profileUrl: 'https://avatars0.githubusercontent.com/u/18614517?s=460&v=4',
      titleCompanion: '친구랑',
      titleActivity: '코딩하기',
      postId: 1
    }
  ]);

  const makeCarouselItem = () => {
    const items = [...datas];

    const result = items.reduce((acc, cur) => {
      acc += `
          <div class="related-post-carousel-item">
            <h3 class="related-post-comment">
            <ProfileImage medium></ProfileImage>
              ${cur.titleCompanion}<br />
              ${cur.titleActivity}
            </h3>
          </div>
      `;
      return acc;
    }, '');

    return parse(result, {
      replace: domNode => {
        if (domNode.name === 'profileimage') {
          return <ProfileImage medium></ProfileImage>;
        }
      }
    });
  };

  const makeCarouselJsx = () => {
    const len = datas.length;

    if (!len) {
      return (
        <div class="related-post-carousel-wrap">
          <h3>아직 이 장소를 방문한 다른 사람이 없네요. 🥺</h3>;
        </div>
      );
    } else {
      return <div class="related-post-carousel-wrap">{makeCarouselItem()}</div>;
    }
  };

  return (
    <div class="related-post">
      <hr></hr>
      <h2 class="related-post-header">이 장소를 방문한 사람들</h2>

      <div class="related-post-carousel">{makeCarouselJsx()}</div>
      <div class="related-post-carousel-btns">
        <button class="carousel-btns-common prev-btn">&lt;</button>
        <button class="carousel-btns-common next-btn">&gt;</button>
      </div>
    </div>
  );
};

export default RelatedPost;
