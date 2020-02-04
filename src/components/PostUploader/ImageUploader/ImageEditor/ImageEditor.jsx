import React, { Suspense, lazy } from 'react';
import classNames from 'classnames/bind';
import styles from './ImageEditor.scss';
import CommonPost from '../../../CommonPost/CommonPost';
import EditorHeader from './EditorHeader';
import EditorFooter from './EditorFooter';
import 'cropperjs/dist/cropper.css';
import { useRef } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';

const cx = classNames.bind(styles);

const Cropper = lazy(() =>
  import(/* webpackChunkName: "cropper" */ 'react-cropper')
);

const ImageEditor = ({ onClose, dataURL }) => {
  const [cropper, setCropper] = useState(null);
  const ref = cropper => setCropper(cropper);

  const rotateLeft = () => cropper.rotate(-90);
  const rotateRight = () => cropper.rotate(90);

  //TODO: rotates crop selection, when rotate button is clicked.
  //  const rotateCropSelection = () => {
  //   const { x, y, width, height } = crop;
  //   const newCrop = {
  //     x: imageSize.height - (height + y),
  //     y: x,
  //     width: height,
  //     height: width
  //   };
  //   setCrop(newCrop);
  // };
  return (
    <CommonPost large className={cx('wrapper')}>
      <EditorHeader onRotateLeft={rotateLeft} onRotateRight={rotateRight} />
      <Suspense fallback={<div>loading...</div>}>
        <Cropper
          ref={ref}
          src={dataURL}
          style={{ height: '400px', width: '100%' }}
        />
      </Suspense>
      <EditorFooter onCancel={onClose} />
    </CommonPost>
  );
};

export default ImageEditor;
