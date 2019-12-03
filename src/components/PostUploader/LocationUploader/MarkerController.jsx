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

  const clickedMarkerImage = useMemo(() => {
    if (kakao) {
      return new kakao.maps.MarkerImage(
        'http://t1.daumcdn.net/mapjsapi/images/2x/marker.png',
        new kakao.maps.Size(29, 42)
      );
    }
  }, [kakao]);

  const setDotMarkerImage = marker => {
    marker.setZIndex(0);
    marker.setImage(dotMarkerImage);
  };

  const setClickedMarkerImage = marker => {
    marker.setZIndex(1);
    marker.setImage(clickedMarkerImage);
  };

  useEffect(() => {
    if (!marker) return;

    if (isFirstRender) {
      setDotMarkerImage(marker);
      setIsFirstRender(false);
    }

    const handleClick = () => {
      setClickedItemIndex(currentMarkerIndex);
    };

    const handleMouseOver = () => {
      const isClickedMarkerImage = marker.getImage() === clickedMarkerImage;
      if (isClickedMarkerImage) return;

      setClickedMarkerImage(marker);
      setHoveredMarkerIndex(currentMarkerIndex);
    };

    const handleMouseOut = () => {
      const isDotMarkerImage = marker.getImage() === dotMarkerImage;
      const isClickedItem = currentMarkerIndex === clickedItemIndex;

      if (isDotMarkerImage) return;

      if (isClickedItem) {
        setHoveredMarkerIndex('UNHOVERED');
        return;
      }
      setDotMarkerImage(marker);
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

    if (currentMarkerIndex === clickedItemIndex) {
      setClickedMarkerImage(marker);
    } else {
      setDotMarkerImage(marker);
    }
  }, [clickedItemIndex]);

  return null;
};

export default MarkerController;
