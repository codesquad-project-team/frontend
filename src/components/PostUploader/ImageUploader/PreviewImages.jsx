import React from "react";
import "./PreviewImages.scss";
import { IMAGE_BUCKET_URL } from "../../../configs";

const PreviewImages = ({
  previewUrls,
  representativeIndex,
  deleteImageHandler,
  representativeImageHandler
}) => {
  return previewUrls.map((image, index) => {
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
};

export default PreviewImages;
