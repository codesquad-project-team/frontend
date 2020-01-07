import React from 'react';
import './ImageUploader.scss';
import FirstInputButton from './FirstInputButton';
import SecondInputButton from './SecondInputButton';
import PreviewImages from './PreviewImages';

const ImageUploader = ({
  images,
  setImages,
  representativeIndex,
  setRepresentativeIndex
}) => {
  const { selectedImages, previewUrls } = images;
  const maximumCnt = 5;

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
          selectedImages: [...images.selectedImages, ...files],
          previewUrls: [...images.previewUrls, ...urls]
        });
      },
      error => {
        console.log(error);
      }
    );
  };

  const deleteImageHandler = e => {
    const deleteTargetIndex = Number(e.target.dataset.deleteTargetIndex);

    if (deleteTargetIndex === representativeIndex) {
      setRepresentativeIndex(!deleteTargetIndex ? 0 : representativeIndex - 1);
    } else if (deleteTargetIndex < representativeIndex) {
      setRepresentativeIndex(representativeIndex - 1);
    }

    setImages({
      selectedImages: removeItem(images.selectedImages, deleteTargetIndex),
      previewUrls: removeItem(images.previewUrls, deleteTargetIndex)
    });
  };

  const removeItem = (arr, targetIndex) =>
    arr.filter((el, idx) => idx !== targetIndex);

  const selectRepresentativeImage = e => {
    const represenTativeIndex = Number(e.target.dataset.representativeIndex);
    setRepresentativeIndex(represenTativeIndex);
  };

  const getImage = ({ target }) => {
    const files = Array.from(target.files);

    if (files.length + previewUrls.length > maximumCnt) {
      alert(`업로드 할 수 있는 이미지의 최대 개수는 ${maximumCnt}개 입니다!`);
      return;
    }

    addImageHandler(files);
  };

  return (
    <div className="image-uploader">
      {previewUrls.length ? (
        <>
          <PreviewImages
            previewUrls={previewUrls}
            deleteImageHandler={deleteImageHandler}
            representativeIndex={representativeIndex}
            representativeImageHandler={selectRepresentativeImage}
          />
          {previewUrls.length < maximumCnt && (
            <SecondInputButton onChangeHandler={getImage} />
          )}
        </>
      ) : (
        <FirstInputButton
          previewUrls={previewUrls}
          onChangeHandler={getImage}
        />
      )}
    </div>
  );
};

export default ImageUploader;
