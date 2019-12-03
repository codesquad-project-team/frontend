import React, { useState, useMemo } from 'react';
import Marker from './react-kakao-maps/Marker';
import CustomOverlay from './react-kakao-maps/CustomOverlay';
import MarkerController from './MarkerController';
import MarkerInfoWindow from './MarkerInfoWindow';

const SearchResultMarkers = ({
  kakao,
  selectedIndex,
  setSelectedIndex,
  searchResult
}) => {
  const needsMarkers = !(
    searchResult === 'ZERO_RESULT' || searchResult === 'INITIAL'
  );
  const [hoveredMarkerIndex, setHoveredMarkerIndex] = useState('UNHOVERED');

  useMemo(() => {
    if (selectedIndex !== 'INITIAL') {
      setHoveredMarkerIndex('UNHOVERED');
    }
  }, [selectedIndex]);

  return (
    <>
      {needsMarkers
        ? searchResult.map(
            ({ x: lng, y: lat, place_name: placeName }, index) => {
              const isMarkerMouseOvered = hoveredMarkerIndex === index;
              const isSelectedMarker = selectedIndex === index;
              return (
                <Marker key={lng} lat={lat} lng={lng}>
                  <MarkerController
                    kakao={kakao}
                    currentMarkerIndex={index}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    hoveredMarkerIndex={hoveredMarkerIndex}
                    setHoveredMarkerIndex={setHoveredMarkerIndex}
                  />
                  {isMarkerMouseOvered || isSelectedMarker ? (
                    <CustomOverlay
                      content={<MarkerInfoWindow placeName={placeName} />}
                      lat={lat}
                      lng={lng}
                      yAnchor={1}
                    />
                  ) : null}
                </Marker>
              );
            }
          )
        : null}
    </>
  );
};

export default SearchResultMarkers;
