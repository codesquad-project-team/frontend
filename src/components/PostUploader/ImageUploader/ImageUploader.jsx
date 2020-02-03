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

const ImageUploader = ({
  images,
  setImages,
  representativeIndex,
  setRepresentativeIndex
}) => {
  const { previewUrls } = images;

  const { Modal, toggleModal: toggleImageEditor, open } = useModal();
  const [imageIndex, setImageIndex] = useState(null);

  const openEditor = ({ target }) => {
    setImageIndex(Number(target.dataset.idx));
    toggleImageEditor();
  };

  const addImageHandler = files => {
    /* Map each file to a promise that resolves to an array of image URI's */
    Promise.all(files.map(file => readFileAsDataURL(file)))
      .then(urls => {
        /* Once all promises are resolved, update state with image URI array */
        setImages(ADD_IMAGES(files, urls));
      })
      .catch(error => console.error(error));
  };

  const deleteImageHandler = e => {
    const targetIndex = Number(e.target.dataset.idx);

    if (targetIndex === representativeIndex && !targetIndex) {
      setRepresentativeIndex(INIT_INDEX());
    } else if (targetIndex === representativeIndex) {
      setRepresentativeIndex(DECREASE_INDEX());
    } else if (targetIndex < representativeIndex) {
      setRepresentativeIndex(DECREASE_INDEX());
    } else if (targetIndex > representativeIndex) {
      /* do nothing */
    }
    setImages(DELETE_IMAGES(targetIndex));
  };

  const selectRepresentativeImage = ({ target }) => {
    setRepresentativeIndex(Number(target.dataset.idx));
  };

  const getImage = ({ target }) => {
    const files = Array.from(target.files);

    files.length + previewUrls.length > MAXIMUM_IMAGES
      ? showAlert('EXCEED_MAXIMUM_IMAGES')
      : addImageHandler(files);
  };

  return (
    <div className={cx('wrapper')}>
      {previewUrls.length ? (
        <>
          <PreviewImages
            previewUrls={previewUrls}
            onDelete={deleteImageHandler}
            representativeIndex={representativeIndex}
            representativeImageHandler={selectRepresentativeImage}
            openEditor={openEditor}
          />
          {previewUrls.length < MAXIMUM_IMAGES && (
            <SecondInputButton onChange={getImage} />
          )}
        </>
      ) : (
        <FirstInputButton onChange={getImage} />
      )}
      {open && (
        <Modal onClick={toggleImageEditor}>
          <ImageEditor
            dataURL={previewUrls[imageIndex]}
            onClick={toggleImageEditor}
          />
        </Modal>
      )}
    </div>
  );
};

export default ImageUploader;

const showAlert = key => {
  const messages = {
    EXCEED_MAXIMUM_IMAGES: `업로드 할 수 있는 이미지의 최대 개수는 ${MAXIMUM_IMAGES}개 입니다!`
  };
  alert(messages[key]);
};

const readFileAsDataURL = file => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', ({ target }) => {
      resolve(target.result);
    });
    reader.readAsDataURL(file);
  });
};

const ADD_IMAGES = (files, URLs) => ({ selectedImages, previewUrls }) => ({
  selectedImages: [...selectedImages, ...files],
  previewUrls: [...previewUrls, ...URLs]
});

const DELETE_IMAGES = targetIndex => ({ selectedImages, previewUrls }) => ({
  selectedImages: removeItem(selectedImages, targetIndex),
  previewUrls: removeItem(previewUrls, targetIndex)
});

const removeItem = (arr, targetIndex) =>
  arr.filter((el, idx) => idx !== targetIndex);

const INIT_INDEX = () => () => 0;
const DECREASE_INDEX = () => index => index - 1;
