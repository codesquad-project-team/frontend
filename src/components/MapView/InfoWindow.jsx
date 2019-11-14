import React from 'react';
import PropTypes from 'prop-types';
import './InfoWindow.scss';
import CloseBtn from '../CommonBtn/CloseBtn';
import { IMAGE_BUCKET_URL } from '../../configs';

const InfoWindow = props => {
  const {
    titlePlace,
    locationAddress,
    locationPhoneNumber,
    locationLinkAddress
  } = props.info;

  return (
    <div className="info-window">
      <h3 className="info-window-location-name">
        <a href={locationLinkAddress} target="_blank" rel="noopener noreferrer">
          {titlePlace}
        </a>
      </h3>
      <hr />
      <div>{locationAddress}</div>
      {/* <img
          src=""
          width="55"
          height="55"
          alt={titlePlace}
          className="info-window-thumbnail"
        />
        <br />  */}
      <div>{locationPhoneNumber}</div>
      <span>
        <a href={locationLinkAddress} target="_blank" rel="noopener noreferrer">
          {locationLinkAddress}
        </a>
      </span>
      <img
        className="info-window-arrow-image"
        src={`${IMAGE_BUCKET_URL}/info-window-arrow.png`}
        alt=""
      />
      <CloseBtn />
    </div>
  );
};

export default InfoWindow;

InfoWindow.propTypes = {
  info: PropTypes.shape({
    titlePlace: PropTypes.string,
    locationAddress: PropTypes.string,
    locationPhoneNumber: PropTypes.string,
    locationLinkAddress: PropTypes.string
  })
};
