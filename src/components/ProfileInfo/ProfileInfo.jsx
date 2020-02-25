import React, { useReducer, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileInfo.scss';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonBtn from '../CommonBtn/CommonBtn';
import { useLoginContext } from '../../contexts/LoginContext';
import useModal from '../../hooks/useModal';
import { WEB_SERVER_URL } from '../../configs';
import FollowerList from './FollowerList';

const cx = classNames.bind(styles);
const reducer = (prevState, state) => ({ ...prevState, ...state });

const ProfileInfo = ({ data, isMyProfile, userId }) => {
  const { Modal, open, toggleModal } = useModal();
  const [profileContent, setProfileContent] = useReducer(reducer, data);
  const { loggedIn, openSigninModal } = useLoginContext();
  const [error, setError] = useState(null);
  const {
    isFollowing,
    nickname,
    totalPosts,
    totalFollowers,
    totalFollowings,
    introduction,
    profileImage
  } = profileContent;

  const sendRequest = async () => {
    if (!loggedIn) {
      openSigninModal();
      return;
    }
    const res = await fetch(`${WEB_SERVER_URL}/user/follow/${userId}`, {
      method: `${isFollowing ? 'DELETE' : 'POST'}`,
      credentials: 'include'
    });
    handleResponse(res, isFollowing ? totalFollowers - 1 : totalFollowers + 1);
  };

  const handleResponse = (res, followers) => {
    switch (res.status) {
      case 200:
        setProfileContent({
          isFollowing: !isFollowing,
          totalFollowers: followers
        });
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
  return (
    <div className={cx('wrapper')}>
      <div className={cx('left-column')}>
        <ProfileImage large src={profileImage} />
        {!isMyProfile && (
          <CommonBtn className={cx('follow-btn')} onClick={sendRequest}>
            {isFollowing ? '팔로우 취소' : '팔로우'}
          </CommonBtn>
        )}
      </div>
      <div className={cx('right-column')}>
        <div className={cx('header')}>
          <span className={cx('username')}>{nickname}</span>
        </div>
        <div className={cx('overview')}>게시글 {totalPosts}개</div>
        <div className={cx('overview', 'hover-effect')} onClick={toggleModal}>
          팔로워 {totalFollowers}명
        </div>
        <div className={cx('overview', 'hover-effect')} onClick={toggleModal}>
          팔로잉 {totalFollowings}명
        </div>
        <div className={cx('introduction')}>{introduction}</div>
      </div>
      {open && <FollowerList Modal={Modal} onClose={toggleModal} />}
    </div>
  );
};

export default ProfileInfo;
