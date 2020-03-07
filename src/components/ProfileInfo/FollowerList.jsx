import React, { useState } from 'react';
import classNames from 'classnames/bind';
import CloseBtn from '../CommonBtn/CloseBtn';
import Follower from './Follower';
import useFetch from '../../hooks/useFetch';
import styles from './FollowerList.scss';
import { WEB_SERVER_URL } from '../../configs';

const cx = classNames.bind(styles);

const FollowerList = ({ Modal, type, onClose, userId }) => {
  const { data: lists, loading } = useFetch({
    URL: `${WEB_SERVER_URL}/user/${userId}/relationship/${type}`,
    onError: {
      400: 'userId 또는 type 오류',
      401: '유효하지 않은 토큰입니다. 다시 로그인 해주세요.',
      500: '서버에 문제가 생겼어요. 잠시 후에 다시 시도해주세요.'
    }
  });

  return (
    <Modal onClick={onClose} className={cx('wrapper')}>
      <div className={cx('header')}>
        <span>{type === 'follower' ? '팔로워' : '팔로잉'}</span>
        <CloseBtn className={cx('close-btn')} onClick={onClose} />
      </div>
      <div className={cx('contents')}>
        {!loading &&
          lists.map(({ id, nickname, profileImage }) => (
            <Follower
              key={id}
              id={id}
              nickname={nickname}
              profileImage={profileImage}
            />
          ))}
      </div>
    </Modal>
  );
};

export default FollowerList;
