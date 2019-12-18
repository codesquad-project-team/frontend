import React, { useState, useMemo, useEffect } from 'react';
import './TitleUploader.scss';
import useInput from '../../hooks/useInput';

const TitleUploader = ({ placeName, setTitle, setReadyToUpload }) => {
  const {
    inputValue,
    setInputValue,
    handleChange: handleInputChange
  } = useInput();
  const { location, companion, activity } = inputValue;
  const [locationInputStyle, setLocationInputStyle] = useState({});

  const [select, setSelect] = useState('');
  const [state, setState] = useState({});
  const { showsFreeInput, isCompanionInputFocused, isOverlayHovered } = state;

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

  const adjustLocationInputWidth = (location = '') => {
    //width 20rem, font-size 4rem 기준 한글 7글자에서 overflow 발생. max는 19자
    const len = location.length;
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

  useMemo(() => {
    setInputValue({ ...inputValue, location: placeName });
  }, [placeName]);

  useMemo(() => {
    if (select === 'free_input') {
      setState({ ...state, showsFreeInput: true });
    } else {
      setInputValue({ ...inputValue, companion: select });
      setState({});
    }
  }, [select]);

  useMemo(() => {
    adjustLocationInputWidth(location);
    setTitle({
      title_location: location,
      title_companion: companion,
      title_activity: activity
    });
    const hasAllTitles = location && companion && activity ? true : false;
    hasAllTitles
      ? setReadyToUpload(prevState => {
          return { ...prevState, hasAllTitles: true };
        })
      : setReadyToUpload(prevState => {
          return { ...prevState, hasAllTitles: false };
        });
  }, [location, companion, activity]);

  return (
    <div className="title-uploader">
      <div className="title-uploader-location-section">
        <input
          type="text"
          placeholder="어디"
          name="location"
          value={location}
          onChange={handleInputChange}
          style={locationInputStyle}
        />
        <span>에서</span>
      </div>
      <span className="title-uploader-companion-section">
        {showsFreeInput ? (
          <input
            type="text"
            placeholder="누구랑"
            name="companion"
            value={companion}
            onChange={handleInputChange}
            onFocus={setInputStateFocused}
            onBlur={setInputStateBlurred}
          />
        ) : (
          <select
            name="companion"
            value={select}
            onChange={handleSelectBoxChange}
          >
            <option value="" disabled>
              누구랑
            </option>
            <option value="혼자서">혼자서</option>
            <option value="친구랑">친구랑</option>
            <option value="연인이랑">연인이랑</option>
            <option value="가족이랑">가족이랑</option>
            <option value="free_input">직접입력</option>
          </select>
        )}
        {isOverlayHovered || isCompanionInputFocused ? (
          <select
            className="title-uploader-overlay-select-box"
            name="companion"
            value={select}
            onChange={handleSelectBoxChange}
            onMouseOver={setOverlayStateHovered}
            onMouseLeave={setOverlayStateUnhovered}
          >
            <option value="free_input" disabled>
              누구랑
            </option>
            <option value="혼자서">혼자서</option>
            <option value="친구랑">친구랑</option>
            <option value="연인이랑">연인이랑</option>
            <option value="가족이랑">가족이랑</option>
          </select>
        ) : null}
      </span>
      <input
        type="text"
        placeholder="뭐하기"
        name="activity"
        value={activity}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TitleUploader;
