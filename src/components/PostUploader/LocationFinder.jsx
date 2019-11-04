import React, { useState, useRef, useEffect } from 'react';
import './LocationFinder.scss';
import NaverMap, { Marker } from 'react-naver-map';
import useInput from '../../hooks/useInput';
import CommonBtn from '../CommonBtn/CommonBtn';
import CloseBtn from '../CommonBtn/CloseBtn';
import { NAVER_MAP_CLIENT_ID } from '../../../map_constants';
import { WEB_SERVER_URL, IMAGE_BUCKET_URL } from '../../configs';

const locationLatitude = 37.5845218; //initial location
const locationLongitude = 126.9975588;

const tempData = [
  {
    name: '스타벅스 한국프레스센터점',
    address: '서울특별시 중구 세종대로 124',
    locationLatitude: 37.5846208,
    locationLongitude: 126.9975798
  },
  {
    name: '스타벅스 시청점',
    address: '서울특별시 중구 을지로 19',
    locationLatitude: 37.5838228,
    locationLongitude: 126.9969598
  }
];

const LocationFinder = ({ className = '', onClick, ...restProps }) => {
  const { inputValue, handleChange } = useInput();
  const { locationKeyword } = inputValue;

  const [searchResult, setSearchResult] = useState(tempData);
  const results = searchResult.map(item => (
    <div className="location-finder-result-item">
      <div className="location-finder-result-item-name">{item.name}</div>
      <div className="location-finder-result-item-address">{item.address}</div>
    </div>
  ));
  const markers = searchResult.map(item => (
    <Marker
      lat={item.locationLatitude}
      lng={item.locationLongitude}
      onClick={() => {}} // id: given id, event: PointerEvent
      icon={{
        url:
          'https://editor-static.pstatic.net/c/resources/common/img/common-icon-places-dot-x2-20180830.png',
        size: { width: 24, height: 24 },
        scaledSize: { width: 24, height: 24 },
        anchor: { x: 12, y: 32 }
      }}
    />
  ));

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const fetchData = async () => {
    const data = await fetch(`${WEB_SERVER_URL}/location?=${locationKeyword}`);
    const json = await data.json();
    setSearchResult(json);
  };

  const handleSubmit = e => {
    e.preventDefault();
    //TODO: locationKeyword를 사용해서 지역검색data fetch하기
    console.log(locationKeyword);
    // fetchData();
  };

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
        <NaverMap
          clientId={NAVER_MAP_CLIENT_ID}
          ncp
          style={{ width: '570px', height: '400px' }}
          initialPosition={{ lat: locationLatitude, lng: locationLongitude }}
          initialZoom={11}
          submodules={['drawing', 'geocoder']}
        >
          {markers}
        </NaverMap>
      </div>
      <div className="location-finder-footer">
        <CommonBtn>확인</CommonBtn>
      </div>
    </div>
  );
};

export default LocationFinder;
