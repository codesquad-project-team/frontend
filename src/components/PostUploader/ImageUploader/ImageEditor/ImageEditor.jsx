import React, { Suspense, lazy } from 'react';
import classNames from 'classnames/bind';
import styles from './ImageEditor.scss';
import CommonPost from '../../../CommonPost/CommonPost';
import EditorHeader from './EditorHeader';
import EditorFooter from './EditorFooter';
import 'cropperjs/dist/cropper.css';

const cx = classNames.bind(styles);

const Cropper = lazy(() =>
  import(/* webpackChunkname: 'cropper' */ 'react-cropper')
);

const ImageEditor = ({ onClick, dataURL }) => {
  return (
    <CommonPost large className={cx('wrapper')}>
      <EditorHeader />
      <Suspense fallback={<div>loading...</div>}>
        <Cropper src={dataURL} style={{ height: '400px', width: '100%' }} />
      </Suspense>
      <EditorFooter onCancel={onClick} />
    </CommonPost>
  );
};

export default ImageEditor;
