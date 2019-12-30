import React, { useState } from 'react';
import './ProfileInfo.scss';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonBtn from '../CommonBtn/CommonBtn';
import { useLoginContext } from '../../contexts/LoginContext';
import { useLoginModalContext } from '../../contexts/LoginModalContext';
import { WEB_SERVER_URL } from '../../configs';

const ProfileInfo = ({ data, isMyProfile, userId }) => {
  const {
    isFollowing: initialFollowStatus,
    nickname,
    totalPosts,
    totalFollowers,
    totalFollowings,
    introduction,
    profileImage
  } = data;

  const [isFollowing, setIsFollowing] = useState(initialFollowStatus);
  const { loggedIn } = useLoginContext();
  const { setNeedsLoginModal } = useLoginModalContext();
  const [error, setError] = useState(null);

  const handleResponse = res => {
    switch (res.status) {
      case 200:
        setIsFollowing(!isFollowing);
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

  const sendRequest = async () => {
    if (!loggedIn) {
      setNeedsLoginModal(true);
      return;
    }
    const res = await fetch(`${WEB_SERVER_URL}/user/follow/${userId}`, {
      method: `${isFollowing ? 'DELETE' : 'POST'}`,
      credentials: 'include'
    });
    handleResponse(res);
  };

  return (
    <div className="profile-info-wrapper">
      <div className="profile-info">
        <div className="profile-info-left-column">
          <ProfileImage large src={profileImage} />
          {!isMyProfile && (
            <CommonBtn
              className="profile-info-follow-btn"
              onClick={sendRequest}
            >
              {isFollowing ? '팔로우 취소' : '팔로우'}
            </CommonBtn>
          )}
        </div>
        <div className="profile-info-right-column">
          <div className="profile-info-header">
            <span className="profile-info-username">{nickname}</span>
          </div>
          <div className="profile-info-overview">게시글 {totalPosts}개</div>
          <div className="profile-info-overview">팔로워 {totalFollowers}명</div>
          <div className="profile-info-overview">
            팔로잉 {totalFollowings}명
          </div>
          <div className="profile-info-introduction">{introduction}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
