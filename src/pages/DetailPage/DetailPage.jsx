import React from 'react';
import DetailPost from '../../components/DetailPost/DetailPost';
import LocationCarousel from '../../components/LocationCarousel/LocationCarousel';
import './DetailPage.scss';

const DetailPage = () => {
  return (
    <div className="DetailPage">
      <h1>This is Detail Page</h1>
      <LocationCarousel></LocationCarousel>
      <DetailPost />
    </div>
  );
};

export default DetailPage;
