import { useState, useMemo } from 'react';

const useMarker = (kakao = window.kakao, map, positionList) => {
  const [markers, setMarkers] = useState([]);

  const clearMarkers = () => {
    markers.forEach(marker => marker.setMap(null));
  };

  useMemo(() => {
    if (!map) return;

    clearMarkers();
    setMarkers(
      positionList.map(item => {
        const position = new kakao.maps.LatLng(item.y, item.x);
        const marker = new kakao.maps.Marker({
          map: map,
          position: position
        });
        return marker;
      })
    );
  }, [positionList]);

  return { markers };
};

export default useMarker;
