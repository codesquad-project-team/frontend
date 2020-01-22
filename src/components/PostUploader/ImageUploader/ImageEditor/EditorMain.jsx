import React from 'react';
import classNames from 'classnames/bind';
import styles from './EditorMain.scss';

const cx = classNames.bind(styles);

const EditorMain = () => {
  return <div className={cx('wrapper')}>this is main</div>;
};

export default EditorMain;
