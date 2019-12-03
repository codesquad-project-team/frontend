import React from 'react';
import './MarkerInfoWindow.scss';
import CustomOverlay from './react-kakao-maps/CustomOverlay';

const MarkerInfoWindow = ({ lat, lng, placeName, when: showTime }) => {
  return (
    <>
      {showTime ? (
        <CustomOverlay
          content={<div className="marker-info-window">{placeName}</div>}
          lat={lat}
          lng={lng}
          yAnchor={1}
        />
      ) : null}
    </>
  );
};

export default MarkerInfoWindow;
