import React from 'react';
import { useHistory } from 'react-router-dom';
import './DetailPostHeader.scss';
import CommonBtn from '../CommonBtn/CommonBtn';
import { useLoginContext } from '../../contexts/LoginContext';

const DetailPostHeader = ({ data }) => {
  const history = useHistory();
  const { id } = useLoginContext();
  const isMyPost = id === data.writer.id;

  const savePostData = () => {
    localStorage.setItem('postData', JSON.stringify(data));
  };

  const handleMouseOver = () => {
    /* TODO
    if(!isFirstMouseOver) return; */
    savePostData();
  };

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
            onMouseOver={handleMouseOver}
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
