import React, { useState } from 'react';
import './ProfileInfo.scss';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonBtn from '../CommonBtn/CommonBtn';
import CommonLink from '../CommonLink/CommonLink';
import { WEB_SERVER_URL } from '../../configs';

const ProfileInfo = ({ data, isMyProfile, userId }) => {
  const {
    isFollowing: initialFollowStatus,
    nickname,
    totalPost,
    totalFollower,
    totalFollowing,
    introduction,
    profileImage
  } = data;
  const selfIntro = introduction ? Buffer.from(introduction).toString() : null;
  const [isFollowing, setIsFollowing] = useState(initialFollowStatus);
  const [error, setError] = useState(null);

  const handleRequestFollowResponse = res => {
    switch (res.status) {
      case 200:
        setIsFollowing(true);
        break;
      case 400:
        setError('INVALID_USER_ID');
        break;
      case 401:
        setError('INVALID_TOKEN');
        break;
      case 500:
        setError('SERVER_ERROR');
        break;
    }
  };

  const requestFollow = async () => {
    const res = await fetch(`${WEB_SERVER_URL}/user/follow/${userId}`, {
      method: 'POST',
      credentials: 'include'
    });
    handleRequestFollowResponse(res);
  };

  const handleCancelFollowResponse = res => {
    switch (res.status) {
      case 200:
        setIsFollowing(false);
        break;
      case 400:
        setError('INVALID_USER_ID');
        break;
      case 401:
        setError('INVALID_TOKEN');
        break;
      case 500:
        setError('SERVER_ERROR');
        break;
    }
  };

  const cancelFollow = async () => {
    const res = await fetch(`${WEB_SERVER_URL}/user/follow/${userId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    handleCancelFollowResponse(res);
  };

  return (
    <div className="profile-info-wrapper">
      <div className="profile-info">
        <div className="profile-info-left-column">
          <ProfileImage large src={profileImage} />
          {!isMyProfile && (
            <CommonBtn
              className="profile-info-follow-btn"
              onClick={isFollowing ? cancelFollow : requestFollow}
            >
              {isFollowing ? '팔로우 취소' : '팔로우'}
            </CommonBtn>
          )}
        </div>
        <div className="profile-info-right-column">
          <div className="profile-info-header">
            <span className="profile-info-username">{nickname}</span>
            {isMyProfile && (
              <CommonLink to="/profile/edit">
                <CommonBtn className="profile-info-edit-btn">
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
