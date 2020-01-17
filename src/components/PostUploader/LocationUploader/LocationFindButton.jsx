import React from 'react';
import classNames from 'classnames/bind';
import styles from './LocationFindButton.scss';
import { IMAGE_BUCKET_URL } from '../../../configs';

const cx = classNames.bind(styles);

const LocationFindButton = ({ onClick: openLocationFinder, children }) => {
  return (
    <button className={cx('wrapper')} onClick={openLocationFinder}>
      <img
        className={cx('icon')}
        src={`${IMAGE_BUCKET_URL}/find-location-icon8.png`}
      />
      <span className={cx('label')}>{children}</span>
    </button>
  );
};

export default LocationFindButton;
