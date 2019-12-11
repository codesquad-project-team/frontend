import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { KakaoMap, Marker, CustomOverlay } from 'react-kakao-maps';
import InfoWindow from '../MapView/InfoWindow';

const MapView = props => {
  const [infoDisplay, setInfoDisplay] = useState(true);
  const { locationLatitude, locationLongitude, ...info } = props.data;

  return (
    <KakaoMap
      // eslint-disable-next-line no-undef
      apiUrl={KAKAO_MAP_API_URL}
      width="800px"
      height="500px"
      level={2}
      lat={locationLatitude}
      lng={locationLongitude}
    >
      <Marker lat={locationLatitude} lng={locationLongitude} />
      {infoDisplay && (
        <CustomOverlay
          content={<InfoWindow info={info} />}
          lat={locationLatitude}
          lng={locationLongitude}
        />
      )}
    </KakaoMap>
  );
};

export default MapView;

MapView.propTypes = {
  data: PropTypes.shape({
    locationLatitude: PropTypes.number,
    locationLongitude: PropTypes.number
  })
};
