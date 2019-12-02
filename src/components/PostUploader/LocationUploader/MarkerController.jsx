import { useState, useContext, useMemo, useEffect } from 'react';
import { MarkerContext } from './react-kakao-maps/Marker';
import { IMAGE_BUCKET_URL } from '../../../configs';

const MarkerController = ({
  kakao,
  currentMarkerIndex,
  selectedIndex,
  setSelectedIndex,
  hoveredMarkerIndex,
  setHoveredMarkerIndex
}) => {
  const { marker } = useContext(MarkerContext);
  const [isFirstRender, setIsFirstRender] = useState(true);

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

    if (isFirstRender) {
      marker.setZIndex(0);
      marker.setImage(dotMarkerImage);
      setIsFirstRender(false);
    }

    const handleClick = () => {
      setSelectedIndex(currentMarkerIndex);
    };

    const handleMouseOver = () => {
      if (marker.getImage() === selectedMarkerImage) return;

      marker.setZIndex(1);
      marker.setImage(selectedMarkerImage);
      setHoveredMarkerIndex(currentMarkerIndex);
    };

    const handleMouseOut = () => {
      if (marker.getImage() === dotMarkerImage) return;
      if (currentMarkerIndex === selectedIndex) return;

      marker.setZIndex(0);
      marker.setImage(dotMarkerImage);
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
  }, [marker, hoveredMarkerIndex, selectedIndex]);

  useMemo(() => {
    if (!marker) return;

    if (currentMarkerIndex === selectedIndex) {
      marker.setZIndex(1);
      marker.setImage(selectedMarkerImage);
    } else {
      marker.setZIndex(0);
      marker.setImage(dotMarkerImage);
    }
  }, [selectedIndex]);

  return null;
};

export default MarkerController;
