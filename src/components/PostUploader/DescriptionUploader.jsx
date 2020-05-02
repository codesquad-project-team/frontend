import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DescriptionUploader.scss';

const cx = classNames.bind(styles);

const MAX_DESCRIPTION_BYTES = 2000;

const DescriptionUploader = ({
  state: {
    post: { description },
  },
  dispatch,
  setUploadStatus,
}) => {
  const [showsOverLimitMessage, setShowsOverLimitMessage] = useState(false);

  const countBytes = (texts) => {
    const len = texts.length;
    let totalBytes = 0;

    for (let index = 0; index < len; index++) {
      const isHangeul = texts.charCodeAt(index) > 128 ? true : false;
      isHangeul ? (totalBytes += 2) : totalBytes++;
    }
    return totalBytes;
  };

  const isOverLimit = (value) => {
    const totalBytes = countBytes(value);

    return totalBytes > MAX_DESCRIPTION_BYTES;
  };

  const handleChange = ({ target: { value } }) => {
    dispatch({ type: 'updateDescription', payload: value });

    if (isOverLimit(value)) {
      setShowsOverLimitMessage(true);
      setUploadStatus({ isOverDescLimit: true });
    } else {
      setShowsOverLimitMessage(false);
      setUploadStatus({ isOverDescLimit: false });
    }
  };

  return (
    <div className={cx('wrapper')}>
      <textarea
        name="description"
        className={cx('text-area', showsOverLimitMessage ? 'overlimit' : '')}
        placeholder="간단한 설명을 적어주세요(선택)."
        value={description}
        onChange={handleChange}
      />
      <div className={cx('overlimit-message')}>
        {showsOverLimitMessage && (
          <span>{MAX_DESCRIPTION_BYTES / 2}자 이하로 작성해주세요.</span>
        )}
      </div>
    </div>
  );
};

export default DescriptionUploader;
