import React, { useState } from 'react';
import './ImageUploader.scss';
import FirstInputButton from './FirstInputButton';
import SecondInputButton from './SecondInputButton';
import PreviewImages from './PreviewImages';
import { IMAGE_BUCKET_URL } from '../../../configs';

const ImageUploader = ({ images, setImages }) => {
  const { selectedImages, previewUrls } = images;
  const [representativeIndex, setRepresentativeIndex] = useState(0);
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
    const deletedImage = e.target.previousSibling.src;
    const targetIndex = images.previewUrls.findIndex(
      url => url === deletedImage
    );

    if (targetIndex === representativeIndex) {
      !targetIndex
        ? setRepresentativeIndex(0)
        : setRepresentativeIndex(targetIndex - 1);
    }

    setImages({
      selectedImages: removeItemWithSlice(images.selectedImages, targetIndex),
      previewUrls: removeItemWithSlice(images.previewUrls, targetIndex)
    });
  };

  const removeItemWithSlice = (arr, index) => {
    const firstArr = arr.slice(0, index);
    const secondArr = arr.slice(index + 1);
    return [...firstArr, ...secondArr];
  };

  const selectRepresentativeImage = e => {
    const represenTativeImage = e.target.previousSibling.previousSibling.src;
    const represenTativeIndex = images.previewUrls.findIndex(
      el => el === represenTativeImage
    );

    setRepresentativeIndex(represenTativeIndex);
  };

  const getImage = ({ target }) => {
    const files = Array.from(target.files);

    if (files.length + selectedImages.length > maximumCnt) {
      alert(`업로드 할 수 있는 이미지의 최대 개수는 ${maximumCnt}개 입니다!`);
      return;
    }

    addImageHandler(files);
  };

  return (
    <div className="image-uploader">
      {selectedImages.length ? (
        <>
          <PreviewImages
            previewUrls={previewUrls}
            deleteImageHandler={deleteImageHandler}
            representativeIndex={representativeIndex}
            representativeImageHandler={selectRepresentativeImage}
          />
          {selectedImages.length < maximumCnt && (
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
