import React, { useState } from "react";
import "./ImageUploader.scss";
import { PRE_SIGNED_URL } from "../../configs";
import { IMAGE_BUCKET_URL } from "../../configs";

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

  const previewImages = previewUrls.map((image, index) => {
    const representativeClassName =
      index === representativeIndex ? "representative" : "non-representative";
    return (
      <div className="image-uploader-preview-wrapper" key={index}>
        <img
          className={`image-uploader-preview-img ${representativeClassName}`}
          src={image}
        />
        <input
          type="image"
          className="image-uploader-preview-img-close-btn"
          src={`${IMAGE_BUCKET_URL}/image-delete-icon-2.png`}
          onClick={deleteImageHandler}
        />

        <input
          type="image"
          className="image-uploader-preview-img-select-btn"
          src={`${IMAGE_BUCKET_URL}/star-icon.png`}
          onClick={representativeImageHandler}
        />
      </div>
    );
  });

  return (
    <div className="image-uploader">
      {previewImages}
      {0 < selectedImages.length && selectedImages.length < maximumCnt && (
        <div className="image-uploader-second-input-wrapper">
          <label
            className="image-uploader-second-input-label"
            htmlFor="second-input"
          >
            +
          </label>
          <input
            className="image-uploader-second-input-btn"
            id="second-input"
            type="file"
            accept="image/*"
            onChange={getImage}
            multiple
            name="filename[]"
          />
        </div>
      )}
      <div
        className="image-uploader-first-input-wrapper"
        style={{
          display: !previewUrls.length ? "inline-block" : "none"
        }}
      >
        <img
          className="image-uploader-first-input-icon"
          src={`${IMAGE_BUCKET_URL}/image-upload-icon.png`}
        />
        <label
          className="image-uploader-first-input-label"
          htmlFor="first-input"
        >
          이미지 선택
        </label>
        <input
          id="first-input"
          type="file"
          accept="image/*"
          className="image-uploader-first-input-btn"
          onChange={getImage}
          multiple
          name="filename[]"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
