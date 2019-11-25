import React from 'react';
import { Marker } from 'react-kakao-maps';

const SearchResultMarkers = ({ searchResult }) => {
  const markers = searchResult.map(item => (
    <Marker
      key={item.y}
      lat={Number(item.y)}
      lng={Number(item.x)}
      width="32"
      height="32"
      image="https://editor-static.pstatic.net/c/resources/common/img/common-icon-places-dot-x2-20180830.png"
    />
  ));
  return <>{markers}</>;
};

export default SearchResultMarkers;
