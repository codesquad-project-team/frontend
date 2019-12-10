import React from 'react';
import './LocationFindButton.scss';
import { IMAGE_BUCKET_URL } from '../../../configs';

const LocationFindButton = ({ onClick: openLocationFinder, children }) => {
  return (
    <button className="location-find-button" onClick={openLocationFinder}>
      <img
        className="location-find-button-icon"
        src={`${IMAGE_BUCKET_URL}/find-location-icon8.png`}
      />
      <span className="location-find-button-label">{children}</span>
    </button>
  );
};

export default LocationFindButton;
