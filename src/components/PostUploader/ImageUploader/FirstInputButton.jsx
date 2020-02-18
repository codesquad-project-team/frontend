import React from 'react';
import classNames from 'classnames/bind';
import styles from './FirstInputButton.scss';
import { IMAGE_BUCKET_URL } from '../../../configs';

const cx = classNames.bind(styles);

const FirstInputButton = ({ onChange, ...props }) => {
  return (
    <div role="button" className={cx('wrapper')} {...props}>
      <img
        className={cx('icon')}
        src={`${IMAGE_BUCKET_URL}/image-upload-icon.png`}
      />
      <label className={cx('label')} htmlFor="first-input">
        이미지 선택
      </label>
      <input
        id="first-input"
        type="file"
        accept="image/*"
        className={cx('btn')}
        onChange={onChange}
        multiple
      />
    </div>
  );
};

export default FirstInputButton;
