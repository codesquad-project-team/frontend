import React, { useState } from "react";
import "./ImageUploader.scss";
import { PRE_SIGNED_URL } from "../../configs";

const ImageUploader = ({
  selectedImages,
  addImageHandler,
  deleteImageHandler
}) => {
  const maximumCnt = 5;

  const getImage = ({ target }) => {
    const files = Array.from(target.files);
    addImageHandler(files);
  };

  const previewImages = selectedImages.map((image, index) => {
    const previewUrl = URL.createObjectURL(image);
    return (
      <img
        className="image-uploader-preview-img"
        src={previewUrl}
        key={index}
      />
    );
  });

  const uploadFile = async e => {
    e.preventDefault();
  };

  return (
    <div className="image-uploader">
      {previewImages}
      {0 < previewImages.length && previewImages.length < maximumCnt && (
        <div className="image-uploader-extra-add-div">
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
        style={{ display: !previewImages.length ? "block" : "none" }}
        multiple
        name="filename[]"
      />
    </div>
  );
};

export default ImageUploader;
