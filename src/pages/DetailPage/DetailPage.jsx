import React from 'react';
import DetailPost from '../../components/DetailPost/DetailPost';
import LocationCarousel from '../../components/LocationCarousel/LocationCarousel';
import RelatedPost from '../../components/RelatedPost/RelatedPost';
import './DetailPage.scss';

const DetailPage = () => {
  return (
    <div className="DetailPage">
      <h1>This is Detail Page</h1>
      <LocationCarousel></LocationCarousel>
      <DetailPost />
      <RelatedPost></RelatedPost>
    </div>
  );
};

export default DetailPage;
