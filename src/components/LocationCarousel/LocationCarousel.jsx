import React from 'react';
import classNames from 'classnames/bind';
import styles from './LocationCarousel.scss';
import Carousel from 'react-bootstrap/Carousel';

const cx = classNames.bind(styles);

const LocationCarousel = ({ data: { images = [] } }) => {
  const carouselItems = images.map(({ url }, index) => {
    return (
      <Carousel.Item key={index}>
        <img className="d-block w-100" src={url} alt="Location Image" />
      </Carousel.Item>
    );
  });

  return (
    <div className={cx('wrapper')}>
      <Carousel>{carouselItems}</Carousel>
    </div>
  );
};

export default LocationCarousel;
