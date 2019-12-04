import React from 'react';
import './ProfileInfo.scss';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonBtn from '../CommonBtn/CommonBtn';
import CommonLink from '../CommonLink/CommonLink';

const ProfileInfo = ({ data, isMyProfile }) => {
  const {
    nickname,
    totalPost,
    totalFollower,
    totalFollowing,
    introduction,
    profileImage
  } = data;
  const selfIntro = introduction ? Buffer.from(introduction).toString() : null;
  return (
    <div className="profile-info-wrapper">
      <div className="profile-info">
        <div className="profile-info-left-column">
          <ProfileImage large src={profileImage} />
          {!isMyProfile && (
            <CommonBtn className="profile-info-follow-btn">팔로우</CommonBtn>
          )}
        </div>
        <div className="profile-info-right-column">
          <div className="profile-info-header">
            <span className="profile-info-username">{nickname}</span>
            {isMyProfile && (
              <CommonLink to="/profile/edit">
                <CommonBtn className="profile-info-edit-btn" styleType="normal">
                  프로필편집
                </CommonBtn>
              </CommonLink>
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
