import React, { useState } from 'react';
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
  const [hoveredImageIdx, setHoveredImageIdx] = useState(null);
  const [hoveredButtonIdx, setHhoveredButtonIdx] = useState(null);

  const handleImageMouseEnter = ({ target }) => {
    setHoveredImageIdx(Number(target.dataset.idx));
  };

  const handleImageMouseLeave = () => {
    setHoveredImageIdx(null);
  };

  const handleButtonMouseEnter = ({ target }) => {
    setHhoveredButtonIdx(Number(target.dataset.idx));
  };

  const handleButtonMouseLeave = () => {
    setHhoveredButtonIdx(null);
  };

  return previewUrls.map((image, index) => {
    const representativeClassName =
      index === representativeIndex ? 'representative' : 'non-representative';
    const isHovered = hoveredImageIdx === index;
    const isButtonHovered = hoveredButtonIdx === index;
    return (
      <div className={cx('wrapper')} key={index}>
        <img
          className={cx('img', representativeClassName)}
          src={image}
          data-idx={index}
          onMouseEnter={handleImageMouseEnter}
          onMouseLeave={handleImageMouseLeave}
        />
        {(isHovered || isButtonHovered) && (
          <div
            className={cx('btn-wrapper')}
            data-idx={index}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            <input
              type="image"
              className={cx('btns')}
              src={`${IMAGE_BUCKET_URL}/star-icon.png`}
              data-idx={index}
              onClick={representativeImageHandler}
            />
            <input
              type="image"
              className={cx('btns')}
              src={`${IMAGE_BUCKET_URL}/edit-icon1.png`}
              data-idx={index}
            />
            <input
              type="image"
              className={cx('btns')}
              src={`${IMAGE_BUCKET_URL}/image-delete-icon-2.png`}
              data-idx={index}
              onClick={deleteImageHandler}
            />
          </div>
        )}
      </div>
    );
  });
};

export default PreviewImages;
