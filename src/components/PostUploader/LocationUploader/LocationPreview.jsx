import React, { useMemo, useEffect } from 'react';
import { KakaoMap } from 'react-kakao-maps';
import useMarker from './useMarker';
import useMapContext from './useMapContext';

const LocationPreview = ({ lat, lng, onClick: openLocationFinder }) => {
  const { MapContextForwarder, kakao, map } = useMapContext();

  const position = useMemo(() => {
    return [{ y: lat, x: lng }];
  }, [lat, lng, map]);

  const { markers } = useMarker(kakao, map, position);

  useMemo(() => {
    if (!map) return;
    // map.setDraggable(false);
    map.setZoomable(false);
    map.setMinLevel(3);
    map.setMaxLevel(3);
  }, [map]);

  useMemo(() => {
    if (!map) return;
    map.setCenter(new kakao.maps.LatLng(lat, lng));
  }, [lat, lng]);

  useEffect(() => {
    if (!map) return;
    kakao.maps.event.addListener(map, 'click', openLocationFinder);
  }, [map]);

  return (
    <KakaoMap
      // eslint-disable-next-line no-undef
      apiUrl={KAKAO_MAP_API_URL}
      width="600px"
      height="200px"
      level={3}
      lat={lat}
      lng={lng}
    >
      <MapContextForwarder />
    </KakaoMap>
  );
};

export default LocationPreview;
