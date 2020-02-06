import React, { Suspense, lazy } from 'react';
import classNames from 'classnames/bind';
import styles from './ImageEditor.scss';
import CommonPost from '../../../CommonPost/CommonPost';
import EditorHeader from './EditorHeader';
import EditorFooter from './EditorFooter';
import 'cropperjs/dist/cropper.css';
import { useState } from 'react';
import { asyncPipe } from '../../../../utils/utils';

const cx = classNames.bind(styles);

const Cropper = lazy(() =>
  import(/* webpackChunkName: "cropper" */ 'react-cropper')
);

const ImageEditor = ({ setImages, images, src, targetIndex, onClose }) => {
  const [cropper, setCropper] = useState(null);
  const ref = cropper => setCropper(cropper);

  const rotateLeft = () => cropper.rotate(-90);
  const rotateRight = () => cropper.rotate(90);

  const saveImage = () =>
    asyncPipe(
      () => UPDATE_IMAGE(images, setImages, cropper, targetIndex),
      onClose
    )();

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
          src={src}
          style={{ height: '400px', width: '100%' }}
        />
      </Suspense>
      <EditorFooter onSave={saveImage} onCancel={onClose} />
    </CommonPost>
  );
};

export default ImageEditor;

const CANVAS_OPTIONS = {
  maxWidth: 4096,
  maxHeight: 4096,
  fillColor: '#fff',
  imageSmoothingEnabled: false,
  imageSmoothingQuality: 'high'
};

const UPDATE_IMAGE = (images, setImages, cropper, index) => {
  asyncPipe(
    () => cropper.getCroppedCanvas(CANVAS_OPTIONS), //sync function
    canvas => convertCanvasToFile(canvas, images[index].original),
    file => updateImage(images, index, file),
    updatedImages => setImages(updatedImages)
  )();
};

const convertCanvasToFile = (canvasElement, originalFile) => {
  const { name, type } = originalFile;
  return new Promise(resolve => {
    canvasElement.toBlob(blob => {
      const file = new File([blob], name, { type });
      resolve(file);
    }, type);
  });
};

const updateImage = async (images, index, forUpload) => {
  const previewURL = await readFileAsDataURL(forUpload);
  return updateArrayWithObject(images, index, { forUpload, previewURL });
};

const updateArrayWithObject = (images, index, item) =>
  images.map((image, idx) => (idx === index ? { ...image, ...item } : image));

const readFileAsDataURL = file => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', ({ target }) => {
      resolve(target.result);
    });
    reader.readAsDataURL(file);
  });
};
