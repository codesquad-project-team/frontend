import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PreviewImages.scss';
import OverlayButtons from './OverlayButtons';

const cx = classNames.bind(styles);

const PreviewImages = ({
  previewUrls,
  representativeIndex,
  onDelete,
  representativeImageHandler,
  openEditor
}) => {
  const [hoveredImageIdx, setHoveredImageIdx] = useState(null);
  const [hoveredButtonIdx, setHoveredButtonIdx] = useState(null);

  const handleImageMouseEnter = ({ target }) => {
    setHoveredImageIdx(Number(target.dataset.idx));
  };

  const handleImageMouseLeave = () => {
    setHoveredImageIdx(null);
  };

  const handleButtonMouseEnter = ({ target }) => {
    setHoveredButtonIdx(Number(target.dataset.idx));
  };

  const handleButtonMouseLeave = () => {
    setHoveredButtonIdx(null);
  };

  return previewUrls.map((image, index) => {
    const representativeClassName =
      index === representativeIndex ? 'representative' : 'non-representative';
    const isImageHovered = hoveredImageIdx === index;
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
        {(isImageHovered || isButtonHovered) && (
          <OverlayButtons
            index={index}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
            onDelete={onDelete}
            representativeImageHandler={representativeImageHandler}
            openEditor={openEditor}
          />
        )}
      </div>
    );
  });
};

export default PreviewImages;
