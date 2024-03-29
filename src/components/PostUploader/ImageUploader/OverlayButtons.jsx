import React from 'react';
import classNames from 'classnames/bind';
import styles from './OverlayButtons.scss';
import { IMAGE_BUCKET_URL } from '../../../configs';

const cx = classNames.bind(styles);

const OverlayButtons = ({
  index,
  onMouseEnter,
  onMouseLeave,
  onSelect,
  onDelete,
  openEditor
}) => {
  return (
    <div
      className={cx('btn-wrapper')}
      data-idx={index}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <input
        type="image"
        className={cx('btns')}
        src={`${IMAGE_BUCKET_URL}/star-icon.png`}
        data-idx={index}
        onClick={onSelect}
      />
      <input
        type="image"
        className={cx('btns')}
        src={`${IMAGE_BUCKET_URL}/edit-icon1.png`}
        data-idx={index}
        onClick={openEditor}
      />
      <input
        type="image"
        className={cx('btns')}
        src={`${IMAGE_BUCKET_URL}/image-delete-icon-2.png`}
        data-idx={index}
        onClick={onDelete}
      />
    </div>
  );
};

export default OverlayButtons;
