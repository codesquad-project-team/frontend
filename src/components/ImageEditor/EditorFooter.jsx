import React from 'react';
import classNames from 'classnames/bind';
import styles from './EditorFooter.scss';
import CommonBtn from '../CommonBtn/CommonBtn';

const cx = classNames.bind(styles);

const EditorFooter = ({ onSave, onCancel }) => {
  return (
    <div className={cx('wrapper')}>
      <CommonBtn className={cx('btns', 'save-btn')} onClick={onSave}>
        저장
      </CommonBtn>
      <div className={cx('separating-line')} />
      <CommonBtn className={cx('btns', 'cancel-btn')} onClick={onCancel}>
        닫기
      </CommonBtn>
    </div>
  );
};

export default EditorFooter;
