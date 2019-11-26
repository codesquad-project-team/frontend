import React from "react";
import "./SecondInputButton.scss";

const SecondInputButton = ({ onChangeHandler }) => {
  return (
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
        onChange={onChangeHandler}
        multiple
      />
    </div>
  );
};

export default SecondInputButton;
