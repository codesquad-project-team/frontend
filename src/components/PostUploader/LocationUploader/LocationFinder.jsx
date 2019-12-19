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
import LocationFinderPopupMessage from './LocationFinderPopupMessage';
import { IMAGE_BUCKET_URL } from '../../../configs';

const INITIAL_LAT = 37.5845218;
const INITIAL_LNG = 126.9975588;

const LocationFinder = ({
  toggleModal: closeModal,
  setSelectedLocation,
  setReadyToUpload
}) => {
  const { inputValue, handleChange } = useInput();
  const { locationKeyword } = inputValue;
  //kakao => 카카오 스크립트 태그를 통해 전역에 생성된 kakao객체의 인스턴스.
  //map => new kakao.maps.Map()을 통해 생성된 지도객체 인스턴스.
  //카카오 지도를 표시하고 조작하기 위한 메서드가 정의되어 있음.
  //http://apis.map.kakao.com/web/documentation/#Map
  const { MapContextForwarder, kakao, map } = useMapContext();
  const { placeService } = usePlaceService(kakao);
  const [searchResult, setSearchResult] = useState('INITIAL');
  const [clickedItemIndex, setClickedItemIndex] = useState('UNCLICKED');
  const [popupActionType, setPopupActionType] = useState('CLOSE');
  const [pagination, setPagination] = useState({});

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //pagination => 카카오가 페이징을 위해 제공하는 객체인스턴스.
  //페이징에 필요한 프로퍼티와 메서드가 미리 정의되어 있음.
  //http://apis.map.kakao.com/web/documentation/#Pagination
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

  //placeService => 카카오가 장소검색을 위해 제공하는 객체인스턴스.
  //장소검색에 필요한 메서드가 미리 정의되어 있음.
  //http://apis.map.kakao.com/web/documentation/#services_Places
  const handleSubmit = e => {
    e.preventDefault();
    placeService.keywordSearch(locationKeyword, handleSearchResponse, {
      location: map.getCenter()
    });
    setClickedItemIndex('UNCLICKED');
  };

  const setClickedItemSelected = ({ currentTarget }) => {
    const index = Number(currentTarget.dataset.index);
    const { x, y } = searchResult[index];

    setClickedItemIndex(index);
    map.setCenter(new kakao.maps.LatLng(y, x));
  };

  const selectLocation = () => {
    if (clickedItemIndex === 'UNCLICKED') {
      setPopupActionType('SELECTION_REQUIRED');
      return;
    }
    setSelectedLocation(searchResult[clickedItemIndex]);
    setReadyToUpload({ hasSelectedLocation: true });
    closeModal();
  };

  const closeLocationFinder = () => {
    const hasClickedItem = clickedItemIndex !== 'UNCLICKED';
    if (hasClickedItem) {
      setPopupActionType('SAVE_REQUIRED');
      return;
    }
    closeModal();
  };

  const focusToFirstItem = (map, searchResult) => {
    if (!map || searchResult === 'ZERO_RESULT' || searchResult === 'INITIAL')
      return;
    const { x: firstItemLng, y: firstItemLat } = searchResult[0];
    map.setCenter(new kakao.maps.LatLng(firstItemLat, firstItemLng));
  };

  useMemo(() => focusToFirstItem(map, searchResult), [map, searchResult]);

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
        <CloseBtn onClick={closeLocationFinder} />
      </div>
      <div className="location-finder-content">
        <SearchResultLists
          className="location-finder-search-result"
          searchResult={searchResult}
          clickedItemIndex={clickedItemIndex}
          setClickedItemIndex={setClickedItemIndex}
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
            clickedItemIndex={clickedItemIndex}
            setClickedItemIndex={setClickedItemIndex}
            searchResult={searchResult}
          />
          <MapContextForwarder />
        </KakaoMap>
      </div>
      <div className="location-finder-footer">
        <CommonBtn onClick={selectLocation}>확인</CommonBtn>
      </div>
      <LocationFinderPopupMessage
        popupActionType={popupActionType}
        setPopupActionType={setPopupActionType}
        closeLocationFinder={closeModal}
      />
    </div>
  );
};

export default LocationFinder;
