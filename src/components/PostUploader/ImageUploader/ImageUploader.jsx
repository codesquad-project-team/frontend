import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ImageUploader.scss';
import FirstInputButton from './FirstInputButton';
import SecondInputButton from './SecondInputButton';
import PreviewImages from './PreviewImages';
import useModal from '../../../hooks/useModal';
import ImageEditor from './ImageEditor/ImageEditor';

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

const ImageUploader = ({ images, setImages, actions }) => {
  const { Modal, toggleModal: toggleImageEditor, open } = useModal();
  const [targetIndex, setTargetIndex] = useState(null);

  const openEditor = ({ target }) => {
    setTargetIndex(Number(target.dataset.idx));
    toggleImageEditor();
  };

  const addImage = async ({ target }) => {
    const Cropper = await importCropper();
    const files = Array.from(target.files);

    files.length + images.length > MAXIMUM_IMAGES
      ? showAlert('EXCEED_MAXIMUM_IMAGES')
      : actions.ADD_IMAGES(setImages, images.length, files, Cropper);
  };

  const deleteImage = ({ target }) => {
    setImages(actions.DELETE_IMAGE(Number(target.dataset.idx)));
  };

  const selectRepresentative = ({ target }) => {
    setImages(actions.UPDATE_REPRESENTATIVE(Number(target.dataset.idx)));
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
        <FirstInputButton onChange={addImage} />
      )}
      {open && (
        <Modal onClick={toggleImageEditor}>
          <ImageEditor
            setImages={setImages}
            actions={actions}
            src={images[targetIndex].originalURL}
            originalFile={images[targetIndex].original}
            cropperData={images[targetIndex].cropperData}
            targetIndex={targetIndex}
            onClose={toggleImageEditor}
          />
        </Modal>
      )}
    </div>
  );
};

export default ImageUploader;
