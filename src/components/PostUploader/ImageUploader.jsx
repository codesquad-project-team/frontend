import React from 'react';
import './ImageUploader.scss';

const ImageUploader = () => {
  return (
    <div className="image-uploader">
      <input type="file" className="post-upload-page-image-input" />
    </div>
  );
};

export default ImageUploader;
