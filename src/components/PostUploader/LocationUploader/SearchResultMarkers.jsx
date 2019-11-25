import React, { useEffect } from 'react';
import useMarker from './useMarker';

const defaultShape = {};

const SearchResultMarkers = ({
  kakao,
  map,
  selectedIndex,
  searchResult,
  children
}) => {
  const { markers } = useMarker(kakao, map, searchResult);

  useEffect(() => {
    if (!markers) return;

    markers.forEach(marker =>
      kakao.maps.event.addListener(marker, 'click', function() {
        console.log('click');
      })
    );
    return () => {
      markers.forEach(marker => marker.setMap(null));
    };
  }, [markers]);

  // const getShape = (selectedIndex, index) => {
  //   return selectedIndex === index ? defaultShape : dotShape;
  // };
  // const markers = searchResult.map((item, index) => (
  //   <Marker
  //     key={item.y}
  //     lat={Number(item.y)}
  //     lng={Number(item.x)}
  //     {...dotShape}
  //   />
  // ));

  return <></>;
};

export default SearchResultMarkers;
