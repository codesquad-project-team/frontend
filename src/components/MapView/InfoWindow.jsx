import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import CloseBtn from '../CommonBtn/CloseBtn';
import styles from './InfoWindow.scss';
import { IMAGE_BUCKET_URL } from '../../configs';

const cx = classNames.bind(styles);

const InfoWindow = ({ info: { name, address, link, phone } = {} }) => {
  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('location-name')}>
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
          className={cx("thumbnail")}
        />
        <br />  */}
      <div>{phone}</div>
      <a href={link} target="_blank" rel="noopener noreferrer">
        {link}
      </a>
      <img
        className={cx('arrow-image')}
        src={`${IMAGE_BUCKET_URL}/info-window-arrow.png`}
        alt=""
      />
      <CloseBtn className={cx('close-btn')} />
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
