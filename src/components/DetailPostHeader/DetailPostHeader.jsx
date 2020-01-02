import React from 'react';
import './DetailPostHeader.scss';
import CommonBtn from '../CommonBtn/CommonBtn';

const DetailPostHeader = () => {
  return (
    <div className="detail-post-header">
      <CommonBtn styleType="underline" className="detail-post-header-btns">
        수정
      </CommonBtn>
      <CommonBtn styleType="underline" className="detail-post-header-btns">
        삭제
      </CommonBtn>
    </div>
  );
};

export default DetailPostHeader;
