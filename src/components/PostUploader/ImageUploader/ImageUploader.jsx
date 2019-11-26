import React, { useState } from "react";
import "./ImageUploader.scss";
import FirstInputButton from "./FirstInputButton";
import SecondInputButton from "./SecondInputButton";
import PreviewImages from "./PreviewImages";
import { IMAGE_BUCKET_URL } from "../../../configs";

const ImageUploader = ({
  images,
  addImageHandler,
  deleteImageHandler,
  representativeImageHandler,
  representativeIndex
}) => {
  const maximumCnt = 5;
  const { selectedImages, previewUrls } = images;

  const getImage = ({ target }) => {
    const files = Array.from(target.files);

    if (files.length + selectedImages.length > 5) {
      alert("업로드 할 수 있는 이미지의 최대 개수는 5개 입니다!");
      return;
    }

    addImageHandler(files);
  };

  return (
    <div className="image-uploader">
      {selectedImages ? (
        <>
          <PreviewImages
            previewUrls={previewUrls}
            deleteImageHandler={deleteImageHandler}
            representativeIndex={representativeIndex}
            representativeImageHandler={representativeImageHandler}
          />
          <SecondInputButton onChangeHandler={getImage} />
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