import React from 'react';
import './ProfileInfo.scss';
import ProfileImage from '../../components/ProfileImage/ProfileImage';

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
          <button>팔로우</button>
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
