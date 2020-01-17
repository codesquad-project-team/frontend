import React from 'react';
import classNames from 'classnames/bind';
import styles from './PreviewImages.scss';
import { IMAGE_BUCKET_URL } from '../../../configs';

const cx = classNames.bind(styles);

const PreviewImages = ({
  previewUrls,
  representativeIndex,
  deleteImageHandler,
  representativeImageHandler
}) => {
  return previewUrls.map((image, index) => {
    const representativeClassName =
      index === representativeIndex ? 'representative' : 'non-representative';
    return (
      <div className={cx('wrapper')} key={index}>
        <img className={cx('img', representativeClassName)} src={image} />
        <input
          type="image"
          className={cx('close-btn')}
          src={`${IMAGE_BUCKET_URL}/image-delete-icon-2.png`}
          onClick={deleteImageHandler}
          data-delete-target-index={index}
        />

        <input
          type="image"
          className={cx('select-btn')}
          src={`${IMAGE_BUCKET_URL}/star-icon.png`}
          onClick={representativeImageHandler}
          data-representative-index={index}
        />
      </div>
    );
  });
};

export default PreviewImages;
