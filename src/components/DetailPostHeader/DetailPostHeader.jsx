import React from 'react';
import { useHistory } from 'react-router-dom';
import './DetailPostHeader.scss';
import CommonBtn from '../CommonBtn/CommonBtn';
import { useLoginContext } from '../../contexts/LoginContext';
import { WEB_SERVER_URL } from '../../configs';

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

  const handleDelete = async () => {
    const res = await fetch(`${WEB_SERVER_URL}/post/${data.id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    console.log(res);
    switch (res.status) {
      case 200:
        alert('게시글이 삭제되었습니다.');
        history.push('/profile');
        break;
      case 400:
        console.error('not exist postId');
        break;
      case 401:
        console.error('unthorized');
        break;
      case 500:
        alert('서버에서 문제가 생겼나봐요. 잠시 후에 다시 시도해주세요.');
        break;
    }
  };

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
