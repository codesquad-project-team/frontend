import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { KakaoMap, Marker, CustomOverlay } from 'react-kakao-maps';
import InfoWindow from '../MapView/InfoWindow';
import useMediaQuerySet from '../../hooks/useMediaQuerySet';

const MapView = ({
  data: { location: { latitude, longitude, ...info } = {} }
}) => {
  const [infoDisplay, setInfoDisplay] = useState(true);
  const { isMobile } = useMediaQuerySet();

  return (
    <KakaoMap
      // eslint-disable-next-line no-undef
      apiUrl={KAKAO_MAP_API_URL}
      width={isMobile ? '95%' : '700px'}
      height={isMobile ? '300px' : '450px'}
      level={2}
      lat={latitude}
      lng={longitude}
    >
      <Marker lat={latitude} lng={longitude} />
      {infoDisplay && (
        <CustomOverlay
          content={<InfoWindow info={info} />}
          lat={latitude}
          lng={longitude}
        />
      )}
    </KakaoMap>
  );
};

export default MapView;

MapView.propTypes = {
  data: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number
  })
};
