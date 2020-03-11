import React, { useState, Suspense, lazy } from 'react';
import classNames from 'classnames/bind';
import CommonPost from '../CommonPost/CommonPost';
import EditorHeader from './EditorHeader';
import EditorFooter from './EditorFooter';
import useMediaQuerySet from '../../hooks/useMediaQuerySet';
import 'cropperjs/dist/cropper.css';
import styles from './ImageEditor.scss';

const cx = classNames.bind(styles);

const Cropper = lazy(() =>
  import(/* webpackChunkName: "react-cropper" */ 'react-cropper')
);

const ImageEditor = ({
  Modal,
  dispatch,
  src,
  originalFile: { name, type },
  cropperData,
  targetIndex,
  onClose
}) => {
  const { isMobile } = useMediaQuerySet();
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

  const saveImage = () => {
    dispatch({
      type: 'cropImage',
      payload: { cropper, name, type, targetIndex }
    });
    onClose();
  };

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
            style={
              isMobile
                ? { width: '90%', height: '60vh', margin: '0 10px' }
                : { width: '450px', height: '500px', margin: '0 10px' }
            }
            viewMode={1}
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
