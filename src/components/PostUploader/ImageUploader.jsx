import React from 'react';
import './ImageUploader.scss';

const ImageUploader = () => {
  return (
    <div className="image-uploader">
      <input type="file" className="image-uploader-input" />
    </div>
  );
};

export default ImageUploader;
