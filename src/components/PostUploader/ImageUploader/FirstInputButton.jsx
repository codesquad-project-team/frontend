import React from "react";
import "./FirstInputButton.scss";
import { IMAGE_BUCKET_URL } from "../../../configs";

const FirstInputButton = ({ onChangeHandler, previewUrls }) => {
  return (
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
      <label className="image-uploader-first-input-label" htmlFor="first-input">
        이미지 선택
      </label>
      <input
        id="first-input"
        type="file"
        accept="image/*"
        className="image-uploader-first-input-btn"
        onChange={onChangeHandler}
        multiple
        name="filename[]"
      />
    </div>
  );
};

export default FirstInputButton;
