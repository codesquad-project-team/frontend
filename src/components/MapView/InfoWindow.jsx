import React from 'react';
import PropTypes from 'prop-types';
import './InfoWindow.scss';
import CloseBtn from '../CommonBtn/CloseBtn';
import { IMAGE_BUCKET_URL } from '../../configs';

const InfoWindow = ({ info: { name, address, link, phone } = {} }) => {
  return (
    <div className="info-window">
      <h3 className="info-window-location-name">
        <a href={link} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </h3>
      <hr />
      <div>{address}</div>
      {/* <img
          src=""
          width="55"
          height="55"
          alt={titlePlace}
          className="info-window-thumbnail"
        />
        <br />  */}
      <div>{phone}</div>
      <span>
        <a href={link} target="_blank" rel="noopener noreferrer">
          {link}
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
    name: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    link: PropTypes.string
  })
};
