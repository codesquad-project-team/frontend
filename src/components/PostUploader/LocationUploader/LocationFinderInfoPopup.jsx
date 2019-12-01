import React, { useMemo } from 'react';
import './LocationFinderInfoPopup.scss';
import useModal from '../../../hooks/useModal';

const messageMap = {
  //TODO: 이대로 닫으시겠어요? 선택결과가 저장이 되지 않습니다. - yes or no 눌러야 사라지도록.
  SELECTION_REQUIRED: '검색 목록이나 지도에서 장소를 선택해주세요.'
};

const LocationFinderInfoPopup = ({ infoPopupState }) => {
  const { open, handleClick: togglePopup } = useModal();
  const message = messageMap[infoPopupState];

  useMemo(() => {
    if (message || open) {
      togglePopup();
    }
  }, [infoPopupState]);

  return (
    <div className="location-finder-info-popup">
      {open && (
        <span className="location-finder-info-popup-message">{message}</span>
      )}
    </div>
  );
};

export default LocationFinderInfoPopup;
