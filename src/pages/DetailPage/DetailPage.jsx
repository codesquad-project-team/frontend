import React from 'react';
import './DetailPage.scss';
import MapView from '../../components/MapView/MapView';

const data = {
  titlePlace: '공공거실',
  titleCompanion: '친구랑',
  titleActivity: '맥주 한잔 하기',
  description: 'string',
  postImageUrls: ['string'],
  locationName: '공공거실',
  locationAddress: '서울특별시 종로구 창경궁로33길 12',
  locationPhoneNumber: '000-0000-0000',
  locationLinkAddress: 'http://www.instagram.com/public_place_',
  locationLatitude: 37.5843342,
  locationLongitude: 126.9992411,
  writerNickname: 'string',
  writerImageUrl: 'string'
};

const DetailPage = () => {
  //fetch(url) + if(loading) render(spinner)
  return (
    <div className="DetailPage">
      <h1>This is Detail Page</h1>
      <MapView data={data} />
    </div>
  );
};

export default DetailPage;
