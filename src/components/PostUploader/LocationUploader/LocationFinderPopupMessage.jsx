import React, { useMemo, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './LocationFinderPopupMessage.scss';
import useModal from '../../../hooks/useModal';
import CommonBtn from '../../CommonBtn/CommonBtn';

const cx = classNames.bind(styles);

const POPUP_DURATION = 1500;

const messageMap = {
  SAVE_REQUIRED:
    '이대로 닫으시겠어요? <br/> 선택하신 장소가 저장되지 않습니다.',
  SELECTION_REQUIRED: '검색 목록이나 지도에서 장소를 선택해주세요.'
};

const LocationFinderPopupMessage = ({
  popupActionType,
  setPopupActionType,
  closeLocationFinder
}) => {
  const { open, toggleModal: togglePopup } = useModal();

  const needsPopup = popupActionType !== 'CLOSE';

  const makeMessageLineByLine = popupActionType => {
    return messageMap[popupActionType].split('<br/>').map((line, idx) => (
      <span key={idx} className={cx('message')}>
        {line}
      </span>
    ));
  };
  const message = needsPopup ? makeMessageLineByLine(popupActionType) : null;

  const closePopup = () => {
    setPopupActionType('CLOSE');
  };

  useMemo(() => {
    if (needsPopup) {
      togglePopup('open');
    } else {
      togglePopup('close');
    }
  }, [popupActionType]);

  useEffect(() => {
    let timerId;
    if (popupActionType === 'SELECTION_REQUIRED') {
      timerId = setTimeout(() => setPopupActionType('CLOSE'), POPUP_DURATION);
    }
    return () => clearTimeout(timerId);
  }, [popupActionType]);

  return (
    open && (
      <div className={cx('wrapper')}>
        {message}
        {popupActionType === 'SAVE_REQUIRED' && (
          <div className={cx('buttons')}>
            <CommonBtn onClick={closeLocationFinder}>네</CommonBtn>
            <CommonBtn onClick={closePopup}>아니오</CommonBtn>
          </div>
        )}
      </div>
    )
  );
};

export default LocationFinderPopupMessage;
