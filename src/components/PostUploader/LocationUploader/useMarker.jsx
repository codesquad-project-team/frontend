import { useState, useEffect } from 'react';

const dotShape = {
  width: '32',
  height: '32',
  image:
    'https://editor-static.pstatic.net/c/resources/common/img/common-icon-places-dot-x2-20180830.png'
};

const useMarker = (kakao = window.kakao, map, positionList) => {
  const [markers, setMarkers] = useState(null);
  useEffect(() => {
    if (!kakao) return;

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
