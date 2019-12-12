import React, { useState, useMemo, useEffect } from 'react';
import './TitleUploader.scss';
import useInput from '../../hooks/useInput';

const TitleUploader = ({ placeName }) => {
  const {
    inputValue,
    setInputValue,
    handleChange: handleInputChange
  } = useInput();
  const { location, companion, activity } = inputValue;

  useMemo(() => setInputValue({ location: placeName }), [placeName]);

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

  useEffect(() => {
    if (select === 'free_input') {
      setState({ ...state, showsFreeInput: true });
    } else {
      setState({});
    }
  }, [select]);

  return (
    <div className="title-uploader">
      <input
        type="text"
        placeholder="어디"
        name="location"
        value={location}
        onChange={handleInputChange}
      />
      <span>에서</span>
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
