import React, { useMemo, useEffect } from 'react';
import { KakaoMap } from 'react-kakao-maps';
import Marker from './react-kakao-maps/Marker';
import useMapContext from './react-kakao-maps/hooks/useMapContext';
import useMediaQuerySet from '../../../hooks/useMediaQuerySet';

const LocationPreview = ({ lat, lng, onClick: openLocationFinder }) => {
  const { MapContextForwarder, kakao, map } = useMapContext();
  const { isMobile } = useMediaQuerySet();

  useMemo(() => {
    if (!map) return;
    // map.setDraggable(false); //적용 시 지도 클릭이벤트가 발생하지 않음
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
      width={isMobile ? '100%' : '600px'}
      height={isMobile ? '150px' : '200px'}
      level={3}
      lat={lat}
      lng={lng}
    >
      <Marker lat={lat} lng={lng} />
      <MapContextForwarder />
    </KakaoMap>
  );
};

export default LocationPreview;
