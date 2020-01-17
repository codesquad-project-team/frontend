import React from 'react';
import classNames from 'classnames/bind';
import styles from './NewPostBtn.scss';
import ToolTip from './ToolTip.jsx';
import { NEW_POST_BTN_IMG_URL } from '../../configs';

const cx = classNames.bind(styles);

const NewPostBtn = () => {
  return (
    <>
      <ToolTip place="top" id="new-post-btn">
        멍멍!(어제 다녀온 곳 올리자!)
      </ToolTip>
      <img
        data-tooltip="new-post-btn"
        className={cx('new-post-btn')}
        src={NEW_POST_BTN_IMG_URL}
      />
    </>
  );
};

export default NewPostBtn;
