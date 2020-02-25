import React from 'react';
import classNames from 'classnames/bind';
import styles from './FollwerList.scss';

const cx = classNames.bind(styles);

const FollowerList = ({ Modal, onClose }) => {
  return (
    <Modal onClick={onClose}>
      <div className={cx('wrapper')}>test</div>
    </Modal>
  );
};

export default FollowerList;
