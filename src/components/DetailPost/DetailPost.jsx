import React from 'react';
import './DetailPost.scss';
import ProfileImage from '../ProfileImage/ProfileImage';

const DetailPost = () => {
  return (
    <div class="detail-post">
      <h1 class="detail-post-title">공공거실에서 친구랑 맥주 한 잔 하기</h1>
      <div class="detail-post-content">
        <div class="detail-post-writer-img">
          <ProfileImage small></ProfileImage>
        </div>
        <div>
          <h3 class="detail-post-writer-name">crazyfish228</h3>
          <p class="detail-post-desc">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda,
            dignissimos. Numquam dolore corrupti minus, iste molestiae pariatur
            at in rem facilis nostrum doloribus molestias natus mollitia
            commodi! Aut, accusantium vitae!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
