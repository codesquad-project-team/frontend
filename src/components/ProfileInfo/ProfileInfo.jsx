import React from 'react';
import './ProfileInfo.scss';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonBtn from '../CommonBtn/CommonBtn';

const ProfileInfo = ({ data }) => {
  const {
    nickname,
    totalPost,
    totalFollower,
    totalFollowing,
    introduction,
    profileImage
  } = data;
  return (
    <div className="profile-info-wrapper">
      <div className="profile-info">
        <div className="profile-info-left-column">
          <ProfileImage large src={profileImage} />
          <CommonBtn>팔로우</CommonBtn>
        </div>
        <div className="profile-info-right-column">
          <div className="profile-info-username">{nickname}</div>
          <div className="profile-info-overview">게시글 {totalPost}개</div>
          <div className="profile-info-overview">팔로워 {totalFollower}명</div>
          <div className="profile-info-overview">팔로잉 {totalFollowing}명</div>
          <div className="profile-info-introduction">{introduction}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
