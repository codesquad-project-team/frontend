import React from 'react';
import DetailPost from '../../components/DetailPost/DetailPost';
import './DetailPage.scss';

const DetailPage = () => {
  return (
    <div className="DetailPage">
      <h1>This is Detail Page</h1>
      <DetailPost />
    </div>
  );
};

export default DetailPage;
