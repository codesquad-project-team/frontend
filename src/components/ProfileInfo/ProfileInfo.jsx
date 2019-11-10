import React from 'react';
import './ProfileInfo.scss';
import { Link } from 'react-router-dom';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonBtn from '../CommonBtn/CommonBtn';

const ProfileInfo = ({ data }) => {
  const {
    isMyProfile,
    nickname,
    totalPost,
    totalFollower,
    totalFollowing,
    introduction,
    profileImage
  } = data;
  const selfIntro = Buffer.from(introduction).toString();
  return (
    <div className="profile-info-wrapper">
      <div className="profile-info">
        <div className="profile-info-left-column">
          <ProfileImage large src={profileImage} />
          <CommonBtn className="profile-info-follow-btn" styleType="normal">
            팔로우
          </CommonBtn>
        </div>
        <div className="profile-info-right-column">
          <div className="profile-info-username">
            {nickname}
            {isMyProfile && (
              <Link to="/profile/edit">
                <CommonBtn className="profile-info-edit-btn" styleType="normal">
                  프로필편집
                </CommonBtn>
              </Link>
            )}
          </div>
          <div className="profile-info-overview">게시글 {totalPost}개</div>
          <div className="profile-info-overview">팔로워 {totalFollower}명</div>
          <div className="profile-info-overview">팔로잉 {totalFollowing}명</div>
          <div className="profile-info-introduction">{selfIntro}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
