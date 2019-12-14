import React from 'react';
import './DescriptionUploader.scss';

const DescriptionUploader = ({ description, setDescription }) => {
  const countBytes = texts => {};

  const handleChange = ({ target }) => {
    const { value } = target;
    countBytes(value);
    setDescription(value);
  };

  return (
    <textarea
      name="description"
      className="description-uploader"
      placeholder="간단한 설명을 적어주세요."
      value={description}
      onChange={handleChange}
    />
  );
};

export default DescriptionUploader;
