import React, { useReducer, useState } from 'react';
import classNames from 'classnames/bind';
import ProfileImage from '../ProfileImage/ProfileImage';
import CommonBtn from '../CommonBtn/CommonBtn';
import { useLoginContext } from '../../contexts/LoginContext';
import useModal from '../../hooks/useModal';
import FollowerList from './FollowerList';
import styles from './ProfileInfo.scss';
import useFetch from '../../hooks/useFetch';
import api from '../../api';

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

  const { request } = useFetch({
    onRequest: () => api.getFollowStatus(userId, isFollowing),
    onSuccess: () =>
      setProfileContent({
        isFollowing: !isFollowing,
        totalFollowers: isFollowing ? totalFollowers - 1 : totalFollowers + 1
      }),
    onError: {
      400: '존재하지 않는 userId입니다.',
      401: '토큰이 만료되었습니다. 다시 로그인해주세요.',
      500: '서버에 문제가 발생했어요. 잠시 후에 다시 시도해주세요.'
    }
  });

  const sendRequest = () => {
    loggedIn ? request() : openSigninModal();
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
