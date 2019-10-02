import React from 'react';
import './LocationCarousel.scss';
import Carousel from 'react-bootstrap/Carousel';

const LocationCarousel = () => {
  // fetch 요청 후 받은 image 의 갯수에 따라 Carousel 컴포넌트 만드는 함수 추가 예정

  return (
    <div class="location-carousel">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.pixabay.com/photo/2015/07/10/17/53/cheers-839865_1280.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.pixabay.com/photo/2015/07/10/17/53/cheers-839865_1280.jpg"
            alt="Secondslide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default LocationCarousel;
