import React, { useState } from 'react';
import classNames from 'classnames/bind';
import IconButton from '../../CommonBtn/IconButton';
import SecondInputButton from './SecondInputButton';
import ImageEditor from '../../ImageEditor';
import PreviewImages from './PreviewImages';
import useModal from '../../../hooks/useModal';
import styles from './ImageUploader.scss';
import { IMAGE_BUCKET_URL } from '../../../configs';

const cx = classNames.bind(styles);

const MAXIMUM_IMAGES = 5;

const showAlert = key => {
  const messages = {
    EXCEED_MAXIMUM_IMAGES: `업로드 할 수 있는 이미지의 최대 개수는 ${MAXIMUM_IMAGES}개 입니다!`
  };
  alert(messages[key]);
};

const importCropper = () =>
  import(/* webpackChunkName: "cropperjs" */ 'cropperjs').then(
    ({ default: Cropper }) => Cropper
  );

const ImageUploader = ({ images, dispatch }) => {
  const { Modal, toggleModal: toggleImageEditor, isOpen } = useModal();
  const [targetIndex, setTargetIndex] = useState(null);

  const openEditor = ({ target }) => {
    setTargetIndex(Number(target.dataset.idx));
    toggleImageEditor();
  };

  const addImage = async ({ target }) => {
    const files = Array.from(target.files);

    files.length + images.length > MAXIMUM_IMAGES
      ? showAlert('EXCEED_MAXIMUM_IMAGES')
      : dispatch({
          type: 'addImages',
          payload: { files, Cropper: await importCropper() }
        });
  };

  const deleteImage = ({ target }) => {
    dispatch({ type: 'deleteImage', payload: Number(target.dataset.idx) });
  };

  const selectRepresentative = ({ target }) => {
    dispatch({
      type: 'updateRepresentative',
      payload: Number(target.dataset.idx)
    });
  };

  return (
    <div className={cx('wrapper')}>
      {images.length ? (
        <>
          <PreviewImages
            images={images}
            onDelete={deleteImage}
            onSelect={selectRepresentative}
            openEditor={openEditor}
          />
          {images.length < MAXIMUM_IMAGES && (
            <SecondInputButton onChange={addImage} />
          )}
        </>
      ) : (
        <IconButton
          type="addImage"
          src={`${IMAGE_BUCKET_URL}/image-upload-icon.png`}
          onChange={addImage}
          multiple
        >
          이미지 선택
        </IconButton>
      )}
      {isOpen && (
        <ImageEditor
          Modal={Modal}
          dispatch={dispatch}
          src={images[targetIndex].originalURL}
          originalFile={images[targetIndex].originalFile}
          cropperData={images[targetIndex].cropperData}
          targetIndex={targetIndex}
          onClose={toggleImageEditor}
        />
      )}
    </div>
  );
};

export default ImageUploader;
