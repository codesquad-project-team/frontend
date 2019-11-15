import React, { useState } from "react";
import "./ImageUploader.scss";
import { PRE_SIGNED_URL } from "../../configs";

const ImageUploader = ({
  selectedImages,
  addImageHandler,
  deleteImageHandler
}) => {
  const getImage = ({ target }) => {
    const files = Array.from(target.files);
    addImageHandler(files);
  };

  const previewImages = selectedImages.map((image, index) => {
    const previewUrl = URL.createObjectURL(image);
    return (
      <li key={index}>
        <img className="image-uploader-preview-img" src={previewUrl} />
      </li>
    );
  });

  const uploadFile = async e => {
    e.preventDefault();
  };

  return (
    <div className="image-uploader">
      <ul className="image-uploader-preview" />
      {previewImages}
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
