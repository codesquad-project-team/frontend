import React from 'react';
import './DetailPost.scss';
import ProfileImage from '../ProfileImage/ProfileImage';

const DetailPost = () => {
  return (
    <div className="detail-post">
      <h1 className="detail-post-title">공공거실에서 친구랑 맥주 한 잔 하기</h1>
      <div className="detail-post-content">
        <div className="detail-post-writer-img">
          <ProfileImage small></ProfileImage>
        </div>
        <div>
          <h3 className="detail-post-writer-name">crazyfish228</h3>
          <p className="detail-post-desc">
            {
              '공공거실에서 친구랑 맥주 한 잔 했더니 너~~~~~~~~~~~~~~~무 기분 좋아요! >_<'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
