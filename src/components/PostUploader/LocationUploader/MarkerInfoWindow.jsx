import React from 'react';
import classNames from 'classnames/bind';
import styles from './MarkerInfoWindow.scss';
import CustomOverlay from './react-kakao-maps/CustomOverlay';

const cx = classNames.bind(styles);

const MarkerInfoWindow = ({ lat, lng, placeName, when: showTime }) => {
  return (
    <>
      {showTime ? (
        <CustomOverlay
          content={<div className={cx('main')}>{placeName}</div>}
          lat={lat}
          lng={lng}
          yAnchor={1}
        />
      ) : null}
    </>
  );
};

export default MarkerInfoWindow;
