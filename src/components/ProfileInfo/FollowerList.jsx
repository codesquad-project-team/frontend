import React, { useState } from 'react';
import classNames from 'classnames/bind';
import CloseBtn from '../CommonBtn/CloseBtn';
import Follower from './Follower';
import useFetch from '../../hooks/useFetch';
import styles from './FollowerList.scss';
import { WEB_SERVER_URL } from '../../configs';

const cx = classNames.bind(styles);

const FollowerList = ({ Modal, type, onClose, userId }) => {
  const [lists, setLists] = useState([]);
  const {
    loading
  } = useFetch(
    `${WEB_SERVER_URL}/user/${userId}/relationship/${type}`,
    {},
    json => setLists(json)
  );

  return (
    <Modal onClick={onClose} className={cx('wrapper')}>
      <div className={cx('header')}>
        <span>팔로워</span>
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
