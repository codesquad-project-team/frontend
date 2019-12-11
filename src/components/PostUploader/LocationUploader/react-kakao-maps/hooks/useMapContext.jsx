import { useState, useEffect, useContext } from 'react';
import KakaoMapContext from 'react-kakao-maps';

const useMapContext = () => {
  const [kakao, setKakao] = useState(null);
  const [map, setMap] = useState(null);

  const MapContextForwarder = () => {
    const { kakaoMapObj, map: mapObj } = useContext(KakaoMapContext);

    useEffect(() => {
      setKakao(kakaoMapObj);
      setMap(mapObj);
    }, [kakaoMapObj, mapObj]);

    return null;
  };

  return { MapContextForwarder, kakao, map };
};

export default useMapContext;
