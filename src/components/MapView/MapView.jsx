import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NaverMap, { Overlay, Marker } from 'react-naver-map';
import InfoWindow from '../MapView/InfoWindow';

const MapView = props => {
  const [infoDisplay, setInfoDisplay] = useState(true);
  const { locationLatitude, locationLongitude, ...info } = props.data;

  return (
    <div>
      <NaverMap
        // eslint-disable-next-line no-undef
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
          onClick={() => setInfoDisplay(true)} // id: given id, event: PointerEvent
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
            if (e.target.className === 'info-window-close-image') {
              setInfoDisplay(false);
            }
          }}
        >
          {infoDisplay && <InfoWindow info={info} />}
        </Overlay>
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
