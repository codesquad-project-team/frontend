import React from 'react';
import './MarkerInfoWindow.scss';

const MarkerInfoWindow = ({ placeName }) => {
  return <div className="marker-info-window">{placeName}</div>;
};

export default MarkerInfoWindow;
