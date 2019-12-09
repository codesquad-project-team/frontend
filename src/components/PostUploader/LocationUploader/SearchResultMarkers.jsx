import React, { useState, useMemo } from 'react';
import Marker from './react-kakao-maps/Marker';
import MarkerController from './MarkerController';
import MarkerInfoWindow from './MarkerInfoWindow';

const SearchResultMarkers = ({
  kakao,
  clickedItemIndex,
  setClickedItemIndex,
  searchResult
}) => {
  const needsMarkers = !(
    searchResult === 'ZERO_RESULT' || searchResult === 'INITIAL'
  );
  const [hoveredMarkerIndex, setHoveredMarkerIndex] = useState('UNHOVERED');

  return (
    <>
      {needsMarkers
        ? searchResult.map(
            ({ x: lng, y: lat, place_name: placeName }, index) => {
              const markerHovered = hoveredMarkerIndex === index;
              const markerClicked = clickedItemIndex === index;
              return (
                <Marker key={lng} lat={lat} lng={lng}>
                  <MarkerController
                    kakao={kakao}
                    currentMarkerIndex={index}
                    clickedItemIndex={clickedItemIndex}
                    setClickedItemIndex={setClickedItemIndex}
                    hoveredMarkerIndex={hoveredMarkerIndex}
                    setHoveredMarkerIndex={setHoveredMarkerIndex}
                  />
                  <MarkerInfoWindow
                    lat={lat}
                    lng={lng}
                    placeName={placeName}
                    when={markerHovered || markerClicked}
                  />
                </Marker>
              );
            }
          )
        : null}
    </>
  );
};

export default SearchResultMarkers;
