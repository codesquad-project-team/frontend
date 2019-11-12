import React, { useState } from 'react';
import './TitleUploader.scss';

const TitleUploader = () => {
  const [select, setSelect] = useState('');
  const handleChange = ({ target }) => {
    setSelect(target.value);
  };
  return (
    <div className="title-uploader">
      <input type="text" placeholder="어디" />
      <span>에서</span>
      <select name="companion" value={select} onChange={handleChange}>
        <option value="" disabled>
          누구랑
        </option>
        <option value="혼자서">혼자서</option>
        <option value="친구랑">친구랑</option>
        <option value="연인이랑">연인이랑</option>
      </select>
      <input type="text" placeholder="뭐하기" />
    </div>
  );
};

export default TitleUploader;
