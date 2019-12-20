import React from 'react';
import './LocationCarousel.scss';
import Carousel from 'react-bootstrap/Carousel';

const LocationCarousel = ({ data }) => {
  const { images } = data;

  const carouselItems = images.map((url, index) => {
    return (
      <Carousel.Item key={index}>
        <img className="d-block w-100" src={url} alt="Location Image" />
      </Carousel.Item>
    );
  });

  return (
    <div className="location-carousel">
      <Carousel>{carouselItems}</Carousel>
    </div>
  );
};

export default LocationCarousel;
