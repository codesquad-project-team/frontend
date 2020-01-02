import React from 'react';
import './DetailPostHeader.scss';
import CommonBtn from '../CommonBtn/CommonBtn';

const DetailPostHeader = ({ history }) => {
  const handleEdit = () => {
    history.push('/post/edit');
  };

  const handleDelete = () => {};

  return (
    <div className="detail-post-header">
      <CommonBtn
        styleType="underline"
        className="detail-post-header-btns"
        onClick={handleEdit}
      >
        수정
      </CommonBtn>
      <CommonBtn
        styleType="underline"
        className="detail-post-header-btns"
        onClick={handleDelete}
      >
        삭제
      </CommonBtn>
    </div>
  );
};

export default DetailPostHeader;
