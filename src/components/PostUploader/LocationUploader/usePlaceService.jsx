import { useState, useEffect } from 'react';

const usePlaceService = kakao => {
  const [placeService, setPlaceService] = useState(null);

  useEffect(() => {
    if (!kakao) return;
    setPlaceService(new kakao.maps.services.Places());
  }, [kakao]);

  return { placeService };
};

export default usePlaceService;
