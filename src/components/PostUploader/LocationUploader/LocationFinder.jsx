import React, { useState, useRef, useEffect, useMemo } from 'react';
import './LocationFinder.scss';
import { KakaoMap } from 'react-kakao-maps';
import useInput from '../../../hooks/useInput';
import CommonBtn from '../../CommonBtn/CommonBtn';
import CloseBtn from '../../CommonBtn/CloseBtn';
import useMapContext from './useMapContext';
import usePlaceService from './usePlaceService';
import SearchResultLists from './SearchResultLists';
import SearchResultMarkers from './SearchResultMarkers';
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
  const [selectedIndex, setSelectedIndex] = useState(null);

  useMemo(() => {
    if (map) {
      const firstItemLat = searchResult[0].y;
      const firstItemLng = searchResult[0].x;
      map.setCenter(new kakao.maps.LatLng(firstItemLat, firstItemLng));
    }
  }, [searchResult]);

  const handleSubmit = e => {
    e.preventDefault();
    placeService.keywordSearch(
      locationKeyword,
      response => setSearchResult(response),
      { location: new kakao.maps.LatLng(currentLat, currentLng), page: 10 }
    );
  };

  const handleClick = ({ currentTarget }) => {
    const index = Number(currentTarget.dataset.index);
    const targetData = searchResult[index];
    const { x = Number(x), y = Number(y) } = targetData;

    setSelectedIndex(index);
    setSelectedLocation(targetData);
    setCurrentLng(x);
    setCurrentLat(y);
    map.setCenter(new kakao.maps.LatLng(y, x));
  };

  // const handleListHover = ({ currentTarget }) => {
  //   kakao.maps.event.addListener(marker, 'mouseover', function() {
  //   alert('marker mouseover!');
  //   });
  // };

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
        <SearchResultLists
          className="location-finder-search-result"
          searchResult={searchResult}
          selectedIndex={selectedIndex}
          handleClick={handleClick}
        />
        <KakaoMap
          // eslint-disable-next-line no-undef
          apiUrl={KAKAO_MAP_API_URL}
          width="570px"
          height="400px"
          level={3}
          lat={initialLat}
          lng={initialLng}
        >
          <SearchResultMarkers
            kakao={kakao}
            map={map}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            searchResult={searchResult}
          />
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
