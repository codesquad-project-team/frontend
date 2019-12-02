import React, { useMemo, useEffect, useContext } from 'react';
import { CustomOverlay } from 'react-kakao-maps';
import Marker from './react-kakao-maps/Marker';
import MarkerController from './MarkerController';

const SearchResultMarkers = ({
  kakao,
  selectedIndex,
  setSelectedIndex,
  searchResult
}) => {
  const needsMarkers =
    searchResult !== 'INITIAL' && searchResult !== 'NO_RESULT';

  return (
    <>
      {needsMarkers
        ? searchResult.map(({ x, y }, index) => {
            const { lat, lng } = { lat: Number(y), lng: Number(x) };
            return (
              <Marker key={lng} lat={lat} lng={lng}>
                <MarkerController
                  index={index}
                  kakao={kakao}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
                {/* <CustomOverlay
                  content={
                    <div
                      style={{
                        width: '100px',
                        height: '100px',
                        background: 'white'
                      }}
                    />
                  }
                  lat={lat}
                  lng={lng}
                  yAnchor={1}
                /> */}
              </Marker>
            );
          })
        : null}
    </>
  );
};

export default SearchResultMarkers;
