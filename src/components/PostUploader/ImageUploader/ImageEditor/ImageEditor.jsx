import React, { useState, Suspense, lazy } from 'react';
import classNames from 'classnames/bind';
import styles from './ImageEditor.scss';
import CommonPost from '../../../CommonPost/CommonPost';
import EditorHeader from './EditorHeader';
import EditorFooter from './EditorFooter';
import 'cropperjs/dist/cropper.css';
import { asyncPipe } from '../../../../utils/utils';

const cx = classNames.bind(styles);

const Cropper = lazy(() =>
  import(/* webpackChunkName: "react-cropper" */ 'react-cropper')
);

const ImageEditor = ({
  Modal,
  setImages,
  actions,
  src,
  originalFile,
  cropperData,
  targetIndex,
  onClose
}) => {
  const [cropper, setCropper] = useState(null);
  const ref = cropper => setCropper(cropper);

  const [isEdited, setIsEdited] = useState(false);

  const rotateLeft = () => {
    setIsEdited(true);
    cropper.rotate(-90);
  };
  const rotateRight = () => {
    setIsEdited(true);
    cropper.rotate(90);
  };

  const saveImage = () =>
    asyncPipe(
      () => actions.UPDATE_IMAGE(setImages, cropper, targetIndex, originalFile),
      onClose
    )();

  const closeEditor = () => {
    isEdited
      ? confirm('편집한 내용이 사라집니다. 창을 닫으시겠어요?') && onClose()
      : onClose();
  };

  return (
    <Modal onClick={closeEditor}>
      <CommonPost large className={cx('wrapper')}>
        <EditorHeader onRotateLeft={rotateLeft} onRotateRight={rotateRight} />
        <Suspense fallback={<div>loading...</div>}>
          <Cropper
            ref={ref}
            src={src}
            style={{ width: '450px', height: '450px' }}
            checkOrientation={false}
            aspectRatio={1 / 1}
            autoCropArea={1}
            data={cropperData}
            cropmove={() => setIsEdited(true)}
          />
        </Suspense>
        <EditorFooter onSave={saveImage} onCancel={closeEditor} />
      </CommonPost>
    </Modal>
  );
};

export default ImageEditor;
