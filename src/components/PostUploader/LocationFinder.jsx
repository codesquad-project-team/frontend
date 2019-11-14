import React, { useState, useRef, useEffect } from 'react';
import './LocationFinder.scss';
import { KakaoMap, Marker } from 'react-kakao-maps';
import useInput from '../../hooks/useInput';
import CommonBtn from '../CommonBtn/CommonBtn';
import CloseBtn from '../CommonBtn/CloseBtn';
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
    <div key={item.locationLatitude} className="location-finder-result-item">
      <div className="location-finder-result-item-name">{item.name}</div>
      <div className="location-finder-result-item-address">{item.address}</div>
    </div>
  ));
  const markers = searchResult.map(item => (
    <Marker
      key={item.locationLatitude}
      lat={item.locationLatitude}
      lng={item.locationLongitude}
      width="32"
      height="32"
      image="https://editor-static.pstatic.net/c/resources/common/img/common-icon-places-dot-x2-20180830.png"
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
        <KakaoMap
          // eslint-disable-next-line no-undef
          apiUrl={KAKAO_MAP_API_URL}
          width="570px"
          height="400px"
          level={3}
          lat={locationLatitude}
          lng={locationLongitude}
        >
          {markers}
        </KakaoMap>
      </div>
      <div className="location-finder-footer">
        <CommonBtn>확인</CommonBtn>
      </div>
    </div>
  );
};

export default LocationFinder;
