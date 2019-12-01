import React, { useMemo } from 'react';
import './LocationFinderInfoPopup.scss';
import useModal from '../../../hooks/useModal';
import CommonBtn from '../../CommonBtn/CommonBtn';

const messageMap = {
  SAVE_REQUIRED:
    '이대로 닫으시겠어요? <br/> 선택하신 장소가 저장되지 않습니다.',
  SELECTION_REQUIRED: '검색 목록이나 지도에서 장소를 선택해주세요.'
};

const LocationFinderInfoPopup = ({
  infoPopupState,
  setInfoPopupState,
  closeLocationFinder
}) => {
  const { open, handleClick: togglePopup } = useModal();

  const getMessage = infoPopupState => {
    if (infoPopupState === 'INITIAL' || infoPopupState === 'CLOSED') return;
    return messageMap[infoPopupState].split('<br/>').map((line, idx) => (
      <span key={idx} className="location-finder-info-popup-message">
        {line}
      </span>
    ));
  };
  const message = getMessage(infoPopupState);

  useMemo(() => {
    if (message || open) {
      togglePopup();
    }
  }, [infoPopupState]);

  const closePopup = () => {
    setInfoPopupState('CLOSED');
  };

  return (
    open && (
      <div className="location-finder-info-popup">
        {message}
        {infoPopupState === 'SAVE_REQUIRED' && (
          <div className="location-finder-info-popup-buttons">
            <CommonBtn onClick={closeLocationFinder}>네</CommonBtn>
            <CommonBtn onClick={closePopup}>아니오</CommonBtn>
          </div>
        )}
      </div>
    )
  );
};

export default LocationFinderInfoPopup;
