import React from 'react';
import './LocationCarousel.scss';
import Carousel from 'react-bootstrap/Carousel';

const LocationCarousel = ({ data }) => {
  const { postImageURLs } = data;

  const makeCarouselItem = imgUrls => {
    return imgUrls.map(url => {
      return (
        <Carousel.Item>
          <img className="d-block w-100" src={url} alt="Location Image" />
        </Carousel.Item>
      );
    });
  };

  return (
    <div class="location-carousel">
      <Carousel>{makeCarouselItem(postImageURLs)}</Carousel>
    </div>
  );
};

export default LocationCarousel;
