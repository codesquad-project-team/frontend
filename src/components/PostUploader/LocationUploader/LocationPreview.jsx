import React, { useMemo } from 'react';
import { KakaoMap } from 'react-kakao-maps';
import useMarker from './useMarker';
import useMapContext from './useMapContext';

const LocationPreview = ({ lat, lng }) => {
  const { MapContextForwarder, kakao, map } = useMapContext();
  const position = useMemo(() => {
    return [{ y: lat, x: lng }];
  }, [map]);

  const { markers } = useMarker(kakao, map, position);

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
