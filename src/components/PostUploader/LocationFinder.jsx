import React, { useState } from 'react';
import './LocationFinder.scss';
import NaverMap, { Overlay, Marker } from 'react-naver-map';
import useFetch from '../../hooks/useFetch';
import useInput from '../../hooks/useInput';
import CommonBtn from '../CommonBtn/CommonBtn';
import { NAVER_MAP_CLIENT_ID } from '../../../map_constants';

const LocationFinder = ({ className = '', onClick, ...restProps }) => {
  //TODO: 추후 기능 구현 시 fetch로 수정
  // const [data, setData] = useState(null);
  const locationLatitude = 37.5845218;
  const locationLongitude = 126.9975588;

  const { inputValue, handleChange } = useInput();
  const { locationKeyword } = inputValue;

  const [searchResult, setSearchResult] = useState(null);

  return (
    <div className="location-finder">
      <div className="location-finder-header">
        <form onSubmit={() => {}}>
          <input
            type="text"
            name="locationKeyword"
            value={locationKeyword}
            onChange={handleChange}
          />
        </form>
        <button
          onClick={onClick}
          className="location-finder-close-btn"
         />
      </div>
      <div className="location-finder-content">
        <div className="location-finder-search-result">{searchResult}</div>
        <NaverMap
          clientId={NAVER_MAP_CLIENT_ID}
          ncp
          style={{ width: '570px', height: '400px' }}
          initialPosition={{ lat: locationLatitude, lng: locationLongitude }}
          initialZoom={11}
          submodules={['drawing', 'geocoder']}
        >
          <Marker
            lat={locationLatitude}
            lng={locationLongitude}
            onClick={() => {}} // id: given id, event: PointerEvent
            shape={{
              coords: [0, 12, 12, 0, 24, 12, 12, 32, 0, 12],
              type: 'poly'
            }} // click mask shape
          />
        </NaverMap>
      </div>
      <div className="location-finder-footer">
        <CommonBtn>확인</CommonBtn>
      </div>
    </div>
  );
};

export default LocationFinder;
