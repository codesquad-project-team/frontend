import React from 'react';
import DetailPost from '../../components/DetailPost/DetailPost';
import LocationCarousel from '../../components/LocationCarousel/LocationCarousel';
import VisitorList from '../../components/VisitorList/VisitorList';
import './DetailPage.scss';

const DetailPage = () => {
  return (
    <div className="DetailPage">
      <h1>This is Detail Page</h1>
      <LocationCarousel></LocationCarousel>
      <DetailPost />
      <VisitorList></VisitorList>
    </div>
  );
};

export default DetailPage;
