import React, { useState } from 'react';
import './PostUploadPage.scss';
import CommonCard from '../../components/CommonCard/CommonCard';
import Header from '../../components/Header/Header';
import CommonBtn from '../../components/CommonBtn/CommonBtn';

const PostUploadPage = () => {
  const [select, setSelect] = useState('');
  const handleChange = ({ target }) => {
    setSelect(target.value);
  };
  return (
    <>
      <Header />
      <CommonCard.background>
        <CommonCard large className="post-upload-page">
          <div className="post-upload-page-image">
            <input type="file" className="post-upload-page-image-input" />
          </div>
          <button>장소검색</button>
          <div className="post-upload-page-title">
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
          <textarea
            name="comment"
            className="post-upload-page-comment"
            placeholder="간단한 코멘트를 남겨주세요."
          />
          <div className="post-upload-page-btns">
            <CommonBtn>작성</CommonBtn>
            <CommonBtn>취소</CommonBtn>
          </div>
        </CommonCard>
      </CommonCard.background>
    </>
  );
};

export default PostUploadPage;
