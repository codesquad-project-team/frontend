import React, { useState, useRef, useEffect, useMemo } from 'react';
import './LocationFinder.scss';
import { KakaoMap } from 'react-kakao-maps';
import useInput from '../../../hooks/useInput';
import CommonBtn from '../../CommonBtn/CommonBtn';
import CloseBtn from '../../CommonBtn/CloseBtn';
import useMapContext from './react-kakao-maps/hooks/useMapContext';
import usePlaceService from './react-kakao-maps/hooks/usePlaceService';
import SearchResultLists from './SearchResultLists';
import SearchResultMarkers from './SearchResultMarkers';
import LocationFinderInfoPopup from './LocationFinderInfoPopup';
import { IMAGE_BUCKET_URL } from '../../../configs';

const INITIAL_LAT = 37.5845218;
const INITIAL_LNG = 126.9975588;
const POPUP_DURATION = 1500;

const LocationFinder = ({ closeModal, setSelectedLocation }) => {
  const [infoPopupState, setInfoPopupState] = useState('INITIAL');
  const { inputValue, handleChange } = useInput();
  const { locationKeyword } = inputValue;

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { MapContextForwarder, kakao, map } = useMapContext();
  const { placeService } = usePlaceService(kakao);
  const [searchResult, setSearchResult] = useState('INITIAL');
  const [selectedIndex, setSelectedIndex] = useState('INITIAL');
  const [pagination, setPagination] = useState({});

  const setMapCenterToFirstItem = (map, searchResult) => {
    if (!map || searchResult === 'ZERO_RESULT' || searchResult === 'INITIAL')
      return;
    const { x: firstItemLng, y: firstItemLat } = searchResult[0];
    map.setCenter(new kakao.maps.LatLng(firstItemLat, firstItemLng));
  };

  useMemo(() => setMapCenterToFirstItem(map, searchResult), [
    map,
    searchResult
  ]);

  const handleSearchResponse = (response, status, pagination) => {
    switch (status) {
      case 'OK':
        setPagination(pagination);
        setSearchResult(response);
        break;
      case 'ZERO_RESULT':
        setSearchResult('ZERO_RESULT');
        break;
      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const currentLatLng = map.getCenter();
    placeService.keywordSearch(locationKeyword, handleSearchResponse, {
      location: currentLatLng
    });
    setSelectedIndex('INITIAL');
  };

  const setClickedItemSelected = ({ currentTarget }) => {
    const index = Number(currentTarget.dataset.index);
    const { x, y } = searchResult[index];

    setSelectedIndex(index);
    map.setCenter(new kakao.maps.LatLng(y, x));
  };

  const saveLocation = () => {
    if (selectedIndex === 'INITIAL') {
      setInfoPopupState('SELECTION_REQUIRED');
      return;
    }
    setSelectedLocation(searchResult[selectedIndex]);
    closeModal();
  };

  useEffect(() => {
    let timerId;
    if (infoPopupState === 'SELECTION_REQUIRED') {
      timerId = setTimeout(() => setInfoPopupState('CLOSED'), POPUP_DURATION);
    }
    return () => clearTimeout(timerId);
  }, [infoPopupState]);

  const closeLocationFinder = () => {
    if (selectedIndex !== 'INITIAL') {
      setInfoPopupState('SAVE_REQUIRED');
      return;
    }
    closeModal();
  };

  return (
    <div className="location-finder">
      <LocationFinderInfoPopup
        infoPopupState={infoPopupState}
        setInfoPopupState={setInfoPopupState}
        closeLocationFinder={closeModal}
      />
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
        <CloseBtn onClick={closeLocationFinder} />
      </div>
      <div className="location-finder-content">
        <SearchResultLists
          className="location-finder-search-result"
          searchResult={searchResult}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          onClick={setClickedItemSelected}
          pagination={pagination}
        />
        <KakaoMap
          // eslint-disable-next-line no-undef
          apiUrl={KAKAO_MAP_API_URL}
          width="570px"
          height="400px"
          level={3}
          lat={INITIAL_LAT}
          lng={INITIAL_LNG}
        >
          <SearchResultMarkers
            kakao={kakao}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            searchResult={searchResult}
          />
          <MapContextForwarder />
        </KakaoMap>
      </div>
      <div className="location-finder-footer">
        <CommonBtn onClick={saveLocation}>확인</CommonBtn>
      </div>
    </div>
  );
};

export default LocationFinder;
