import React, { useState, useRef, useEffect } from 'react';
import './LocationFinder.scss';
import { KakaoMap, Marker } from 'react-kakao-maps';
import useInput from '../../../hooks/useInput';
import CommonBtn from '../../CommonBtn/CommonBtn';
import CloseBtn from '../../CommonBtn/CloseBtn';
import useMapContext from './useMapContext';
import usePlaceService from './usePlaceService';
import { IMAGE_BUCKET_URL } from '../../../configs';

const initialLat = 37.5845218; //initial location
const initialLng = 126.9975588;

const LocationFinder = ({ className = '', onClick, ...restProps }) => {
  const { inputValue, handleChange } = useInput();
  const { locationKeyword } = inputValue;

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [currentLat, setCurrentLat] = useState(initialLat);
  const [currentLng, setCurrentLng] = useState(initialLng);

  const { MapContextForwarder, kakao, map } = useMapContext();
  const { placeService } = usePlaceService(kakao);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    placeService.keywordSearch(
      locationKeyword,
      response => setSearchResult(response),
      { location: new kakao.maps.LatLng(currentLat, currentLng), page: 10 }
    );
  };

  const handleClick = ({ currentTarget }) => {
    const index = currentTarget.dataset.index;
    const targetData = searchResult[index];
    const { x, y } = targetData;

    setSelectedLocation(targetData);
    setCurrentLng(x);
    setCurrentLat(y);
    map.setCenter(new kakao.maps.LatLng(y, x));
  };

  const results = searchResult.map((item, index) => (
    <div
      key={item.x}
      data-index={index}
      className="location-finder-result-item"
      onClick={handleClick}
    >
      <div className="location-finder-result-item-name">{item.place_name}</div>
      <div className="location-finder-result-item-address">
        {item.address_name}
      </div>
    </div>
  ));

  const markers = searchResult.map(item => (
    <Marker
      key={item.y}
      lat={item.y}
      lng={item.x}
      width="32"
      height="32"
      image="https://editor-static.pstatic.net/c/resources/common/img/common-icon-places-dot-x2-20180830.png"
    />
  ));

  //검색어 자동완성
  // const searchPlaces = useCallback(
  //   debounce(keyword => {
  //     placeService.keywordSearch(keyword, d => console.log(d));
  //   }),
  //   [placeService]
  // );

  // useEffect(() => {
  //   if (!locationKeyword || !placeService) return;
  //   console.log(locationKeyword);
  //   searchPlaces(locationKeyword);
  // }, [locationKeyword]);

  return (
    <div className="location-finder">
      <div className="location-finder-header">
        <form onSubmit={handleSubmit}>
          <img
            src={`${IMAGE_BUCKET_URL}/magnifier-icon.png`}
            className="location-finder-search-icon"
          />
          <input
            ref={inputRef}
            type="text"
            name="locationKeyword"
            value={locationKeyword}
            onChange={handleChange}
            placeholder="장소명을 입력해주세요"
          />
        </form>
        <CloseBtn onClick={onClick} />
      </div>
      <div className="location-finder-content">
        <div className="location-finder-search-result">{results}</div>
        <KakaoMap
          // eslint-disable-next-line no-undef
          apiUrl={KAKAO_MAP_API_URL}
          width="570px"
          height="400px"
          level={3}
          lat={initialLat}
          lng={initialLng}
        >
          {markers}
          <MapContextForwarder />
        </KakaoMap>
      </div>
      <div className="location-finder-footer">
        <CommonBtn>확인</CommonBtn>
      </div>
    </div>
  );
};

export default LocationFinder;
