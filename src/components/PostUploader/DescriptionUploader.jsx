import React, { useState } from 'react';
import './DescriptionUploader.scss';

const MAX_DESCRIPTION_BYTES = 2000;

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
      setReadyToUpload(prevState => {
        return { ...prevState, isOverDescLimit: true };
      });
    } else {
      setShowsOverLimitMessage(false);
      setReadyToUpload(prevState => {
        return { ...prevState, isOverDescLimit: false };
      });
    }
  };

  return (
    <div>
      <textarea
        name="description"
        className={`description-uploader ${
          showsOverLimitMessage ? 'description-overlimit' : ''
        }`}
        placeholder="간단한 설명을 적어주세요."
        value={description}
        onChange={handleChange}
      />
      <div className="description-overlimit-message">
        {showsOverLimitMessage && (
          <span>{MAX_DESCRIPTION_BYTES / 2}자 이하로 작성해주세요.</span>
        )}
      </div>
    </div>
  );
};

export default DescriptionUploader;
