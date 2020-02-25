import React from 'react';
import classNames from 'classnames/bind';
import CloseBtn from '../CommonBtn/CloseBtn';
import Follower from './Follwer';
import styles from './FollwerList.scss';

const cx = classNames.bind(styles);

const FollowerList = ({ Modal, onClose }) => {
  const lists = [{ id: 101, nickname: 'Allenk', profileImage: '' }];

  return (
    <Modal onClick={onClose} className={cx('wrapper')}>
      <div className={cx('header')}>
        <span>팔로워</span>
        <CloseBtn className={cx('close-btn')} onClick={onClose} />
      </div>
      <div className={cx('contents')}>
        {lists.map(({ id, nickname, profileImage }) => (
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
