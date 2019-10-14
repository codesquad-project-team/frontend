import React from 'react';
import DetailPost from '../../components/DetailPost/DetailPost';
import LocationCarousel from '../../components/LocationCarousel/LocationCarousel';
import RelatedPost from '../../components/RelatedPost/RelatedPost';
import './DetailPage.scss';
import Header from '../../components/Header/Header';
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
      <Header />
      <LocationCarousel></LocationCarousel>
      <DetailPost />
      <MapView data={data} />
      <RelatedPost></RelatedPost>
    </div>
  );
};

export default DetailPage;
