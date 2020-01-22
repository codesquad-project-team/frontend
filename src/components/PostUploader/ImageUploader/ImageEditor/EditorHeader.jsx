import React from 'react';
import classNames from 'classnames/bind';
import styles from './EditorHeader.scss';
import CommonBtn from '../../../CommonBtn/CommonBtn';

const cx = classNames.bind(styles);

const EditorHeader = () => {
  return (
    <div className={cx('wrapper')}>
      <CommonBtn className={cx('btns', 'rotate-left-btn')}>
        왼쪽으로 회전
      </CommonBtn>
      <div className={cx('separating-line')} />
      <CommonBtn className={cx('btns', 'rotate-right-btn')}>
        오른쪽으로 회전
      </CommonBtn>
    </div>
  );
};

export default EditorHeader;
