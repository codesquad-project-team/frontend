import React, { useState } from "react";
import "./ImageUploader.scss";
import { PRE_SIGNED_URL } from "../../configs";

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
        <button
          className="image-uploader-preview-img-close-btn"
          onClick={deleteImageHandler}
        >
          X
        </button>
        <button
          className="image-uploader-preview-img-select-btn"
          onClick={representativeImageHandler}
        >
          *
        </button>
      </div>
    );
  });

  return (
    <div className="image-uploader">
      {previewImages}
      {0 < selectedImages.length && selectedImages.length < maximumCnt && (
        <div className="image-uploader-extra-add-wrapper">
          <label className="image-uploader-extra-add-label" htmlFor="extra-add">
            +
          </label>
          <input
            className="image-uploader-extra-add-btn"
            id="extra-add"
            type="file"
            accept="image/*"
            onChange={getImage}
            multiple
            name="filename[]"
          />
        </div>
      )}
      <input
        id="upload-image"
        type="file"
        accept="image/*"
        className="image-uploader-input"
        onChange={getImage}
        style={{
          display: !previewUrls.length ? "block" : "none"
        }}
        multiple
        name="filename[]"
      />
    </div>
  );
};

export default ImageUploader;
