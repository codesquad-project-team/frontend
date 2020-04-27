import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './TitleUploader.scss';
import useInput from '../../../hooks/useInput';
import useDebounce from '../../../hooks/useDebounce';
import useMediaQuerySet from '../../../hooks/useMediaQuerySet';
import CompanionInput from './CompanionInput';

const cx = classNames.bind(styles);

const TitleUploader = ({ placeName, title, setTitle, setReadyToUpload }) => {
  const {
    inputValue,
    setInputValue,
    handleChange: handleInputChange,
  } = useInput(title);
  const { isDesktop } = useMediaQuerySet();
  const { place, companion, activity } = inputValue;
  const [locationInputStyle, setLocationInputStyle] = useState({});

  const adjustLocationInputWidth = (place = '') => {
    //width 20rem, font-size 4rem 기준 한글 7글자에서 overflow 발생. max는 19자
    const len = place.length;
    const OVERFLOW_CRITERION = 7;
    const MAX_WIDTH = 19;
    const MAX_WIDTH_REM = 59;
    const ADJUST_REM = 3.25;
    const DEFAULT_WIDTH_REM = 20;
    const inputOverflows = len >= OVERFLOW_CRITERION;
    const overflowQuantity = len - OVERFLOW_CRITERION;
    const overMaxWidth = len > MAX_WIDTH;
    const adjustedWidth = DEFAULT_WIDTH_REM + ADJUST_REM * overflowQuantity;
    const newWidth =
      adjustedWidth > MAX_WIDTH_REM ? MAX_WIDTH_REM : adjustedWidth;

    //TODO: 최대길이 넘어갈 경우 font-size 줄이기
    // if(overMaxWidth) {
    //   setLocationInputStyle({width: `${DEFAULT_WIDTH + ADJUST_REM * overflowQuantity}rem`})
    // }
    inputOverflows
      ? setLocationInputStyle({
          width: `${newWidth}rem`,
        })
      : setLocationInputStyle({});
  };

  useEffect(() => {
    if (!placeName) return;
    setInputValue({ ...inputValue, place: placeName });
  }, [placeName]);

  useEffect(() => {
    updateTitles(place, companion, activity);
  }, [place, companion, activity]);

  const updateTitles = useDebounce((place, companion, activity) => {
    const isAllEmpty = !(place || companion || activity);
    if (isAllEmpty) return;

    setTitle({
      place,
      companion,
      activity,
    });

    const hasAllTitles = place && companion && activity;
    hasAllTitles
      ? setReadyToUpload({ hasAllTitles: true })
      : setReadyToUpload({ hasAllTitles: false });
  });

  useEffect(() => {
    isDesktop && adjustLocationInputWidth(place); //TODO: custom hook 분리
  }, [place]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('place-section')}>
        <input
          type="text"
          placeholder="어디"
          name="place"
          value={place}
          className={cx('text-boxes')}
          onChange={handleInputChange}
          style={locationInputStyle}
        />
        <span>에서</span>
      </div>
      <span className={cx('companion-section')}>
        <CompanionInput value={companion} onChange={handleInputChange} />
      </span>
      <input
        type="text"
        placeholder="뭐하기"
        name="activity"
        className={cx('text-boxes')}
        value={activity}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TitleUploader;
