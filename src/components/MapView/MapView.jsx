import React from 'react';
import PropTypes from 'prop-types';
import NaverMap, { Overlay, Marker } from 'react-naver-map';
import { NAVER_MAP_CLIENT_ID } from '../../../map_constants';

const MapView = props => {
  const { locationLatitude, locationLongitude } = props.data;
  return (
    <div>
      <NaverMap
        clientId={NAVER_MAP_CLIENT_ID}
        ncp
        style={{ width: '800px', height: '500px' }}
        initialPosition={{ lat: locationLatitude, lng: locationLongitude }}
        initialZoom={11}
        submodules={['drawing', 'geocoder']}
      >
        <Marker
          lat={locationLatitude}
          lng={locationLongitude}
          onClick={event => {}} // id: given id, event: PointerEvent
          shape={{
            coords: [0, 12, 12, 0, 24, 12, 12, 32, 0, 12],
            type: 'poly'
          }} // click mask shape
        />
        <Overlay
          lat={locationLatitude}
          lng={locationLongitude}
          zIndex={200}
          onClick={e => {
            e.stopPropagation();
          }}
        ></Overlay>
      </NaverMap>
    </div>
  );
};

export default MapView;

MapView.propTypes = {
  data: PropTypes.shape({
    locationLatitude: PropTypes.number,
    locationLongitude: PropTypes.number
  })
};
