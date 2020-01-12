import React from 'react';
import classNames from 'classnames/bind';
import styles from './ImageUploader.scss';
import FirstInputButton from './FirstInputButton';
import SecondInputButton from './SecondInputButton';
import PreviewImages from './PreviewImages';
import useModal from '../../../hooks/useModal';
import ImageEditor from './ImageEditor';

const cx = classNames.bind(styles);

const MAXIMUM_IMAGES = 5;

const showAlert = key => {
  const messages = {
    EXCEED_MAXIMUM_IMAGES: `업로드 할 수 있는 이미지의 최대 개수는 ${MAXIMUM_IMAGES}개 입니다!`
  };
  alert(messages[key]);
};

const ImageUploader = ({
  images,
  setImages,
  representativeIndex,
  setRepresentativeIndex
}) => {
  const { selectedImages, previewUrls } = images;

  const { Modal, toggleModal: toggleImageEditor, open } = useModal();

  const addImageHandler = files => {
    /* Map each file to a promise that resolves to an array of image URI's */
    Promise.all(
      files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener('load', ({ target }) => {
            resolve(target.result);
          });
          reader.readAsDataURL(file); // file을 읽기 가능한 url로 변환하여 target의 result 속성에 넣는다.
        });
      })
    ).then(
      urls => {
        /* Once all promises are resolved, update state with image URI array */
        setImages({
          selectedImages: [...selectedImages, ...files],
          previewUrls: [...previewUrls, ...urls]
        });
      },
      error => {
        console.log(error);
      }
    );
  };

  const deleteImageHandler = e => {
    const deleteTargetIndex = Number(e.target.dataset.idx);

    if (deleteTargetIndex === representativeIndex) {
      setRepresentativeIndex(!deleteTargetIndex ? 0 : representativeIndex - 1);
    } else if (deleteTargetIndex < representativeIndex) {
      setRepresentativeIndex(representativeIndex - 1);
    }

    setImages({
      selectedImages: removeItem(selectedImages, deleteTargetIndex),
      previewUrls: removeItem(previewUrls, deleteTargetIndex)
    });
  };

  const removeItem = (arr, targetIndex) =>
    arr.filter((el, idx) => idx !== targetIndex);

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
            deleteImageHandler={deleteImageHandler}
            representativeIndex={representativeIndex}
            representativeImageHandler={selectRepresentativeImage}
            toggleImageEditor={toggleImageEditor}
          />
          {previewUrls.length < MAXIMUM_IMAGES && (
            <SecondInputButton onChangeHandler={getImage} />
          )}
        </>
      ) : (
        <FirstInputButton onChangeHandler={getImage} />
      )}
      {open && (
        <Modal onClick={toggleImageEditor}>
          <ImageEditor onClick={toggleImageEditor} />
        </Modal>
      )}
    </div>
  );
};

export default ImageUploader;
