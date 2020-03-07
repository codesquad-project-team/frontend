import React, { useReducer, useState } from 'react';
import classNames from 'classnames/bind';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonBtn from '../CommonBtn/CommonBtn';
import { useLoginContext } from '../../contexts/LoginContext';
import useModal from '../../hooks/useModal';
import { WEB_SERVER_URL } from '../../configs';
import { handleResponse } from '../../utils/utils';
import FollowerList from './FollowerList';
import styles from './ProfileInfo.scss';

const cx = classNames.bind(styles);
const reducer = (prevState, state) => ({ ...prevState, ...state });

const ProfileInfo = ({ data, isMyProfile, userId }) => {
  const { Modal, isOpen, toggleModal } = useModal();
  const [profileContent, setProfileContent] = useReducer(reducer, data);
  const { loggedIn, openSigninModal } = useLoginContext();

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

    handleResponse(res.status, {
      200: () =>
        setProfileContent({
          isFollowing: !isFollowing,
          totalFollowers: isFollowing ? totalFollowers - 1 : totalFollowers + 1
        }),
      400: () => alert('존재하지 않는 userId입니다.'),
      401: () => alert('토큰이 만료되었습니다. 다시 로그인해주세요.'),
      500: () => alert('서버에 문제가 발생했어요. 잠시 후에 다시 시도해주세요.')
    });
  };

  const [modalType, setModalType] = useState(null);
  const openFollowingList = () => {
    setModalType('following');
    toggleModal();
  };
  const openFollowerList = () => {
    setModalType('follower');
    toggleModal();
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
        <div className={cx('overview')}>
          <span className={cx('hover-effect')} onClick={openFollowerList}>
            팔로워 {totalFollowers}명
          </span>
        </div>
        <div className={cx('overview')}>
          <span className={cx('hover-effect')} onClick={openFollowingList}>
            팔로잉 {totalFollowings}명
          </span>
        </div>
        <div className={cx('introduction')}>{introduction}</div>
      </div>
      {isOpen && (
        <FollowerList
          Modal={Modal}
          type={modalType}
          onClose={toggleModal}
          userId={userId}
        />
      )}
    </div>
  );
};

export default ProfileInfo;
