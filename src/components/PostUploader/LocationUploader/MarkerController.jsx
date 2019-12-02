import { useState, useContext, useMemo, useEffect } from 'react';
import { MarkerContext } from './react-kakao-maps/Marker';

const MarkerController = ({
  kakao,
  index,
  selectedIndex,
  setSelectedIndex
}) => {
  const { marker } = useContext(MarkerContext);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const dotMarkerImage = useMemo(() => {
    if (kakao) {
      return new kakao.maps.MarkerImage(
        'https://editor-static.pstatic.net/c/resources/common/img/common-icon-places-dot-x2-20180830.png',
        new kakao.maps.Size(32, 32)
      );
    }
  }, [kakao]);

  const selectedMarkerImage = useMemo(() => {
    if (kakao) {
      return new kakao.maps.MarkerImage(
        'http://t1.daumcdn.net/mapjsapi/images/2x/marker.png',
        new kakao.maps.Size(29, 42)
      );
    }
  }, [kakao]);

  useEffect(() => {
    if (!marker) return;
    //마커 첫 렌더링 시 dot 모양으로 설정
    marker.setImage(dotMarkerImage);

    //마커에 이벤트핸들러 설정
    kakao.maps.event.addListener(marker, 'click', () => {
      setSelectedMarker(marker);
      setSelectedIndex(index);
    });
    kakao.maps.event.addListener(marker, 'mouseover', () => {
      marker.setImage(selectedMarkerImage);
    });
    kakao.maps.event.addListener(marker, 'mouseout', () => {
      marker.setImage(dotMarkerImage);
    });
  }, [marker]);

  useMemo(() => {
    if (!marker) return;

    //이전 selectedMarker를 dotMaker로 변경
    if (marker !== selectedMarker) {
      marker.setImage(dotMarkerImage);
    }

    //이벤트핸들러 재설정
    kakao.maps.event.addListener(marker, 'mouseout', () => {
      //mouseout시 일단 dotMarkerImage로 변경
      marker.setImage(dotMarkerImage);
      //만약 selectedMarker라면 다시 selectedMarkerImage로 변경
      if (marker === selectedMarker) {
        marker.setImage(selectedMarkerImage);
      }
    });
  }, [selectedMarker]);

  useMemo(() => {
    if (!marker) return;

    if (index === selectedIndex) {
      marker.setImage(selectedMarkerImage);
      setSelectedMarker(marker);
    } else {
      marker.setImage(dotMarkerImage);
    }
  }, [selectedIndex]);

  return null;
};

export default MarkerController;