import React, { useState } from 'react';
import './DescriptionUploader.scss';

const MAX_DESCRIPTION_BYTES = 100;

const DescriptionUploader = ({
  description,
  setDescription,
  setReadyToUpload
}) => {
  const [showsOverLimitMessage, setShowsOverLimitMessage] = useState(false);

  const countBytes = texts => {
    const len = texts.length;
    let totalBytes = 0;

    for (let index = 0; index < len; index++) {
      const isHangeul = texts.charCodeAt(index) > 128 ? true : false;
      isHangeul ? (totalBytes += 2) : totalBytes++;
    }
    return totalBytes;
  };

  const isOverLimit = value => {
    const totalBytes = countBytes(value);

    return totalBytes > MAX_DESCRIPTION_BYTES ? true : false;
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setDescription(value);

    if (isOverLimit(value)) {
      setShowsOverLimitMessage(true);
      //TODO
      // setReadyToUpload(false);
    } else {
      setShowsOverLimitMessage(false);
      //TODO
      // setReadyToUpload(true);
    }
  };

  return (
    <textarea
      name="description"
      className={`description-uploader ${
        showsOverLimitMessage ? 'description-over-limit' : ''
      }`}
      placeholder="간단한 설명을 적어주세요."
      value={description}
      onChange={handleChange}
    />
  );
};

export default DescriptionUploader;
