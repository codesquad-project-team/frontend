import React, { useState } from 'react';
import './RelatedPost.scss';
import ProfileImage from '../ProfileImage/ProfileImage';

const RelatedPost = () => {
  return (
    <>
      <div class="related-post">
        <hr></hr>
        <h2 class="related-post-header">이 장소를 방문한 사람들</h2>

        <div class="related-post-carousel-wrap">
          <div class="related-post-carousel">
            <div class="related-post-carousel-item">
              <ProfileImage medium></ProfileImage>
              <h3 class="related-post-comment">
                누구랑 <br />
                ~하기
              </h3>
            </div>
            <div class="related-post-carousel-item">
              <ProfileImage medium></ProfileImage>
              <h3 class="related-post-comment">
                누구랑 <br />
                ~하기
              </h3>
            </div>
            <div class="related-post-carousel-item">
              <ProfileImage medium></ProfileImage>
              <h3 class="related-post-comment">
                누구랑 <br />
                ~하기
              </h3>
            </div>
            <div class="related-post-carousel-item">
              <ProfileImage medium></ProfileImage>
              <h3 class="related-post-comment">
                누구랑 <br />
                ~하기
              </h3>
            </div>
            <div class="related-post-carousel-item">
              <ProfileImage medium></ProfileImage>
              <h3 class="related-post-comment">
                누구랑 <br />
                ~하기
              </h3>
            </div>
          </div>
          <div class="related-post-carousel-btns">
            <button class="carousel-btns-common prev-btn">&lt;</button>
            <button class="carousel-btns-common next-btn">&gt;</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedPost;
