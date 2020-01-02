import React from 'react';
import './DetailPostHeader.scss';
import CommonBtn from '../CommonBtn/CommonBtn';
import { useLoginContext } from '../../contexts/LoginContext';

const DetailPostHeader = ({ history, writerId }) => {
  const { id } = useLoginContext();
  const isMyPost = id === writerId;

  const handleEdit = () => {
    history.push('/post/edit');
  };

  const handleDelete = () => {};

  return (
    <div className="detail-post-header">
      {isMyPost && (
        <>
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
        </>
      )}
    </div>
  );
};

export default DetailPostHeader;
