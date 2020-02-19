import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './TitleUploader.scss';
import useInput from '../../hooks/useInput';
import useMediaQuerySet from '../../hooks/useMediaQuerySet';

const cx = classNames.bind(styles);

const TitleUploader = ({ placeName, title, setTitle, setReadyToUpload }) => {
  const {
    inputValue,
    setInputValue,
    handleChange: handleInputChange
  } = useInput(title);
  const { isDesktop } = useMediaQuerySet();
  const { place, companion, activity } = inputValue;
  const [locationInputStyle, setLocationInputStyle] = useState({});

  const [select, setSelect] = useState(companion || '');
  const [state, setState] = useState({});
  const { isCompanionInputFocused, isOverlayHovered } = state;

  const handleSelectBoxChange = ({ target }) => {
    setSelect(target.value);
  };

  const setInputStateFocused = () => {
    setState({ ...state, isCompanionInputFocused: true });
  };

  const setInputStateBlurred = () => {
    setState({ ...state, isCompanionInputFocused: false });
  };

  const setOverlayStateHovered = () => {
    setState({ ...state, isOverlayHovered: true });
  };

  const setOverlayStateUnhovered = () => {
    setState({ ...state, isOverlayHovered: false });
  };

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
          width: `${newWidth}rem`
        })
      : setLocationInputStyle({});
  };

  useEffect(() => {
    if (!placeName) return;
    setInputValue({ ...inputValue, place: placeName });
  }, [placeName]);

  useEffect(() => {
    if (!select) return;
    setInputValue({ ...inputValue, companion: select });
    setState({});
  }, [select]);

  useEffect(() => {
    if (!(place || companion || activity)) return;
    isDesktop && adjustLocationInputWidth(place);
    setTitle({
      place,
      companion,
      activity
    });
    const hasAllTitles = place && companion && activity ? true : false;
    hasAllTitles
      ? setReadyToUpload({ hasAllTitles: true })
      : setReadyToUpload({ hasAllTitles: false });
  }, [place, companion, activity]);

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
        <input
          type="text"
          placeholder="누구랑"
          name="companion"
          className={cx('text-boxes')}
          value={companion}
          onChange={handleInputChange}
          onFocus={setInputStateFocused}
          onBlur={setInputStateBlurred}
        />
        {(isOverlayHovered || isCompanionInputFocused) && (
          <select
            className={cx('overlay-select-box', 'text-boxes')}
            name="companion"
            value={select}
            onChange={handleSelectBoxChange}
            onMouseOver={setOverlayStateHovered}
            onMouseLeave={setOverlayStateUnhovered}
          >
            <option value="_default" disabled>
              누구랑
            </option>
            <option value="혼자서">혼자서</option>
            <option value="친구랑">친구랑</option>
            <option value="연인이랑">연인이랑</option>
            <option value="가족이랑">가족이랑</option>
          </select>
        )}
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
