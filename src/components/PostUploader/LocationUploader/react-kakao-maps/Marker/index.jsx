import React, { useContext, useEffect, useState } from 'react';
import KakaoMapContext from 'react-kakao-maps';
import defaultMapOptions from '../constants';
import PropTypes from 'prop-types';

Marker.propTypes = {
  lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  image: PropTypes.string,
  children: PropTypes.object
};

export const MarkerContext = React.createContext();

export default function Marker({ lat, lng, image, children, ...options }) {
  const { kakaoMapObj: kakao, map } = useContext(KakaoMapContext);
  const [state, setState] = useState({
    marker: null,
    width: 0,
    height: 0
  });
  const { width, height, ...restOptions } = options;

  useEffect(() => {
    if (!map) return;
    const markerLat = lat || defaultMapOptions.lat;
    const markerLng = lng || defaultMapOptions.lng;
    const markerWidth = width || defaultMapOptions.marker.width;
    const markerHeight = height || defaultMapOptions.marker.height;

    const markerImage = new kakao.maps.MarkerImage(
      image || defaultMapOptions.marker.image,
      new kakao.maps.Size(markerWidth, markerHeight)
    );

    setState({
      marker: new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(markerLat, markerLng),
        image: markerImage,
        ...restOptions
      }),
      width: markerWidth,
      height: markerHeight
    });

    return () => {
      if (state && state.marker) state.marker.setMap(null);
    };
  }, [map, lat, lng]);

  return (
    <MarkerContext.Provider value={{ ...state }}>
      <MarkerUnmounter />
      {children}
    </MarkerContext.Provider>
  );
}

const MarkerUnmounter = () => {
  const { marker } = useContext(MarkerContext);
  useEffect(() => {
    if (!marker) return;
    return () => {
      marker.setMap(null);
    };
  }, [marker]);
  return null;
};
