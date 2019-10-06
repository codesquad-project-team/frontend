import React from 'react';
import PropTypes from 'prop-types';
import './InfoWindow.scss';

const InfoWindow = props => {
  const {
    locationName,
    locationAddress,
    locationPhoneNumber,
    locationLinkAddress
  } = props.info;

  return (
    <>
      <div className="info-window">
        <h3 className="info-window-location-name">
          <a
            href={locationLinkAddress}
            target="_blank"
            rel="noopener noreferrer"
          >
            {locationName}
          </a>
        </h3>
        <hr />
        <div>{locationAddress}</div>
        {/* <img
          src=""
          width="55"
          height="55"
          alt={locationName}
          className="info-window-thumbnail"
        />
        <br />  */}
        <div>{locationPhoneNumber}</div>
        <span>
          <a
            href={locationLinkAddress}
            target="_blank"
            rel="noopener noreferrer"
          >
            {locationLinkAddress}
          </a>
        </span>
      </div>
      <img
        className="info-window-arrow"
        src="./resources/info-window-arrow.png"
        alt=""
      />
      <img
        src="./resources/times-solid.png"
        className="info-window-close"
      ></img>
    </>
  );
};

export default InfoWindow;

InfoWindow.propTypes = {
  info: PropTypes.shape({
    locationName: PropTypes.string,
    locationAddress: PropTypes.string,
    locationPhoneNumber: PropTypes.string,
    locationLinkAddress: PropTypes.string
  })
};
