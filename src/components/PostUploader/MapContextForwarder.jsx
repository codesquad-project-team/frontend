import { useEffect, useContext } from 'react';
import KakaoMapContext from 'react-kakao-maps';

const MapContextForwarder = ({ setKakao, setMap }) => {
  const { kakaoMapObj, map } = useContext(KakaoMapContext);

  useEffect(() => {
    setKakao(kakaoMapObj);
    setMap(map);
  }, [kakaoMapObj, map]);

  return null;
};

export default MapContextForwarder;
