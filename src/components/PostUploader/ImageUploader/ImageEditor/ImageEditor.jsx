import React from 'react';
import classNames from 'classnames/bind';
import styles from './ImageEditor.scss';
import CommonPost from '../../../CommonPost/CommonPost';
import EditorHeader from './EditorHeader';
import EditorMain from './EditorMain';
import EditorFooter from './EditorFooter';

const cx = classNames.bind(styles);

const ImageEditor = ({ onClick }) => {
  return (
    <CommonPost large className={cx('wrapper')}>
      <EditorHeader />
      <EditorMain />
      <EditorFooter onCancel={onClick} />
    </CommonPost>
  );
};

export default ImageEditor;
