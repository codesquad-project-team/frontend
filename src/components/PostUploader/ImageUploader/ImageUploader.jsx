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

const ImageUploader = ({ images, setImages }) => {
  const { Modal, toggleModal: toggleImageEditor, open } = useModal();
  const [targetIndex, setTargetIndex] = useState(null);

  const openEditor = ({ target }) => {
    setTargetIndex(Number(target.dataset.idx));
    toggleImageEditor();
  };

  const addImage = ({ target }) => {
    const files = Array.from(target.files);

    files.length + images.length > MAXIMUM_IMAGES
      ? showAlert('EXCEED_MAXIMUM_IMAGES')
      : addImageHandler(files);
  };

  const addImageHandler = files => {
    getDataURLs(files)
      .then(URLs => setImages(ADD_IMAGES(files, URLs)))
      .catch(error => console.error(error));
  };

  const deleteImage = ({ target }) => {
    setImages(DELETE_IMAGES(Number(target.dataset.idx)));
  };

  const selectRepresentative = ({ target }) => {
    setImages(UPDATE_REPRESENTATIVE(Number(target.dataset.idx)));
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
            dataURL={images[targetIndex].previewURL}
            onClose={toggleImageEditor}
          />
        </Modal>
      )}
    </div>
  );
};

export default ImageUploader;

/* helper functions for ImageUploader */
const showAlert = key => {
  const messages = {
    EXCEED_MAXIMUM_IMAGES: `업로드 할 수 있는 이미지의 최대 개수는 ${MAXIMUM_IMAGES}개 입니다!`
  };
  alert(messages[key]);
};

/**
 * @returns {Promise}
 */
const getDataURLs = files =>
  Promise.all(files.map(file => readFileAsDataURL(file))).catch(err =>
    console.error(err)
  );

/* action functions */
const ADD_IMAGES = (files, URLs) => images =>
  images.length
    ? addImages(images, files, URLs)
    : pipe(
        images => addImages(images, files, URLs),
        images => initRepresentative(images)
      )(images);

const DELETE_IMAGES = targetIndex => images =>
  targetIndex === getRepresentativeIndex(images)
    ? pipe(
        images => removeItem(images, targetIndex),
        images => initRepresentative(images)
      )(images)
    : removeItem(images, targetIndex);

const UPDATE_REPRESENTATIVE = targetIndex => images =>
  images.map((obj, idx) =>
    targetIndex === idx
      ? { ...obj, isRepresentative: true }
      : { ...obj, isRepresentative: false }
  );

/* action helpers  */
/**
 * @returns {Promise}
 */
const readFileAsDataURL = file => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', ({ target }) => {
      resolve(target.result);
    });
    reader.readAsDataURL(file);
  });
};

const addImages = (images, files, URLs) => [
  ...images,
  ...files.map((file, idx) => ({
    original: file,
    forUpload: file,
    previewURL: URLs[idx],
    isRepresentative: false
  }))
];

const initRepresentative = images =>
  images.map((obj, idx) =>
    idx === 0 ? { ...obj, isRepresentative: true } : obj
  );

const getRepresentativeIndex = images =>
  images.findIndex(item => item.isRepresentative);

const removeItem = (arr, targetIndex) =>
  arr.filter((el, idx) => idx !== targetIndex);

const pipe = (...callbacks) => param =>
  callbacks.reduce((acc, curr) => curr(acc), param);
