import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PreviewImages.scss';
import OverlayButtons from './OverlayButtons';

const cx = classNames.bind(styles);

const PreviewImages = ({ images, onDelete, onSelect, openEditor }) => {
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

  return images.map(({ previewURL, isRepresentative }, index) => {
    const isImageHovered = hoveredImageIdx === index;
    const isButtonHovered = hoveredButtonIdx === index;
    return (
      <div className={cx('wrapper')} key={index}>
        <img
          className={cx('img', isRepresentative && 'representative')}
          src={previewURL}
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
            onSelect={onSelect}
            openEditor={openEditor}
          />
        )}
      </div>
    );
  });
};

export default PreviewImages;
