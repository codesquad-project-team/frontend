import React from 'react';
import './VisitorList.scss';
import ProfileImage from '../ProfileImage/ProfileImage';

const VisitorList = () => {
  return (
    <>
      <div class="visitor-list">
        <hr></hr>
        <h2 class="visitor-list-header">이 장소를 방문한 사람들</h2>

        <div class="visitor-list-carousel-wrap">
          <div class="visitor-list-carousel">
            <div class="visitor-list-carousel-item">
              <ProfileImage medium></ProfileImage>
              <h3 class="visitor-comment">
                누구랑 <br />
                ~하기
              </h3>
            </div>
            <div class="visitor-list-carousel-item">
              <ProfileImage medium></ProfileImage>
              <h3 class="visitor-comment">
                누구랑 <br />
                ~하기
              </h3>
            </div>
            <div class="visitor-list-carousel-item">
              <ProfileImage medium></ProfileImage>
              <h3 class="visitor-comment">
                누구랑 <br />
                ~하기
              </h3>
            </div>
            <div class="visitor-list-carousel-item">
              <ProfileImage medium></ProfileImage>
              <h3 class="visitor-comment">
                누구랑 <br />
                ~하기
              </h3>
            </div>
            <div class="visitor-list-carousel-item">
              <ProfileImage medium></ProfileImage>
              <h3 class="visitor-comment">
                누구랑 <br />
                ~하기
              </h3>
            </div>
          </div>
          <div class="visitor-list-carousel-btns">
            <button class="carousel-btns-common prev-btn">&lt;</button>
            <button class="carousel-btns-common next-btn">&gt;</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitorList;
