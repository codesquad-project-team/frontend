import { useState, useContext, useMemo, useEffect } from 'react';
import { MarkerContext } from './react-kakao-maps/Marker';
import { IMAGE_BUCKET_URL } from '../../../configs';

const MarkerController = ({
  kakao,
  currentMarkerIndex,
  clickedItemIndex,
  setClickedItemIndex,
  hoveredMarkerIndex,
  setHoveredMarkerIndex
}) => {
  //marker => 카카오에서 제공하는 지도 마커 인스턴스.
  //지도에 표시된 마커를 조작하기 위해 사용합니다.
  //마커 1개를 의미합니다.
  //http://apis.map.kakao.com/web/documentation/#Marker
  const { marker } = useContext(MarkerContext);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const isClickedMarker = currentMarkerIndex === clickedItemIndex;

  const dotMarkerImage = useMemo(() => {
    if (kakao) {
      return new kakao.maps.MarkerImage(
        `${IMAGE_BUCKET_URL}/marker-shape-dot.png`,
        new kakao.maps.Size(16, 16),
        {
          offset: new kakao.maps.Point(8, 18)
        }
      );
    }
  }, [kakao]);

  const clickedMarkerImage = useMemo(() => {
    if (kakao) {
      return new kakao.maps.MarkerImage(
        'http://t1.daumcdn.net/mapjsapi/images/2x/marker.png',
        new kakao.maps.Size(29, 42)
      );
    }
  }, [kakao]);

  const setThisMarkerDotImage = marker => {
    marker.setZIndex(0);
    marker.setImage(dotMarkerImage);
  };

  const setThisMarkerClickedImage = marker => {
    marker.setZIndex(1);
    marker.setImage(clickedMarkerImage);
  };

  useEffect(() => {
    if (!marker) return;

    if (isFirstRender) {
      setThisMarkerDotImage(marker);
      setIsFirstRender(false);
    }

    const handleClick = () => {
      setClickedItemIndex(currentMarkerIndex);
    };

    const handleMouseOver = () => {
      const isClickedMarkerImage = marker.getImage() === clickedMarkerImage;
      if (isClickedMarkerImage) return;

      setThisMarkerClickedImage(marker);
      setHoveredMarkerIndex(currentMarkerIndex);
    };

    const handleMouseOut = () => {
      const isDotMarkerImage = marker.getImage() === dotMarkerImage;
      if (isDotMarkerImage) return;

      if (isClickedMarker) {
        setHoveredMarkerIndex('UNHOVERED');
        return;
      }
      setThisMarkerDotImage(marker);
      setHoveredMarkerIndex('UNHOVERED');
    };

    kakao.maps.event.addListener(marker, 'click', handleClick);
    kakao.maps.event.addListener(marker, 'mouseover', handleMouseOver);
    kakao.maps.event.addListener(marker, 'mouseout', handleMouseOut);

    return () => {
      kakao.maps.event.removeListener(marker, 'click', handleClick);
      kakao.maps.event.removeListener(marker, 'mouseover', handleMouseOver);
      kakao.maps.event.removeListener(marker, 'mouseout', handleMouseOut);
    };
  }, [marker, hoveredMarkerIndex, clickedItemIndex]);

  useMemo(() => {
    if (!marker) return;

    if (isClickedMarker) {
      setThisMarkerClickedImage(marker);
    } else {
      setThisMarkerDotImage(marker);
    }
  }, [clickedItemIndex]);

  return null;
};

export default MarkerController;
