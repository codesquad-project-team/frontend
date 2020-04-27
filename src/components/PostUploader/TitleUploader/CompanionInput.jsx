import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CompanionInput.scss';

const cx = classNames.bind(styles);

const CompanionInput = ({ value, onChange }) => {
  const [selectValue, setSelectValue] = useState(value || '');
  const [status, setStatus] = useState({});
  const { isInputFocused, isSelectBoxHovered } = status;

  const handleSelectBoxChange = ({ target }) => {
    setSelectValue(target.value);
  };

  const setInputFocused = () => {
    setStatus({ ...status, isInputFocused: true });
  };

  const setInputBlurred = () => {
    setStatus({ ...status, isInputFocused: false });
  };

  const setSelectBoxHovered = () => {
    setStatus({ ...status, isSelectBoxHovered: true });
  };

  const setSelectBoxUnhovered = () => {
    setStatus({ ...status, isSelectBoxHovered: false });
  };
  useEffect(() => {
    if (!selectValue) return;
    onChange({ name: 'companion', value: selectValue });
    setStatus({});
  }, [selectValue]);

  return (
    <>
      <input
        type="text"
        placeholder="누구랑"
        name="companion"
        className={cx('text-boxes')}
        value={value}
        onChange={onChange}
        onFocus={setInputFocused}
        onBlur={setInputBlurred}
      />
      {(isSelectBoxHovered || isInputFocused) && (
        <select
          className={cx('overlay-select-box', 'text-boxes')}
          name="companion"
          value={selectValue}
          onChange={handleSelectBoxChange}
          onMouseOver={setSelectBoxHovered}
          onMouseLeave={setSelectBoxUnhovered}
        >
          <option value="누구랑">누구랑</option>
          <option value="혼자서">혼자서</option>
          <option value="친구랑">친구랑</option>
          <option value="연인이랑">연인이랑</option>
          <option value="가족이랑">가족이랑</option>
        </select>
      )}
    </>
  );
};

export default CompanionInput;
