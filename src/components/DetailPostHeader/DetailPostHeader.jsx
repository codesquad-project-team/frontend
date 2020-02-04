import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './DetailPostHeader.scss';
import CommonBtn from '../CommonBtn/CommonBtn';
import { useLoginContext } from '../../contexts/LoginContext';
import { WEB_SERVER_URL } from '../../configs';

const cx = classNames.bind(styles);

const DetailPostHeader = ({ data }) => {
  const history = useHistory();
  const [isFirstMouseOver, setIsFirstMouseOver] = useState(true);
  const { id } = useLoginContext();
  const isMyPost = id === data.writer.id;

  const savePostData = () => {
    localStorage.setItem('postData', JSON.stringify(data));
  };

  const handleMouseOver = () => {
    if (!isFirstMouseOver) return;
    savePostData();
    setIsFirstMouseOver(false);
  };

  const handleEdit = () => {
    history.push('/post/edit');
  };

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠어요?')) return;
    const res = await fetch(`${WEB_SERVER_URL}/post/${data.id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
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
    <div className={cx('wrapper')}>
      {isMyPost && (
        <>
          <CommonBtn
            styleType="underline"
            className={cx('btns')}
            onMouseOver={handleMouseOver}
            onClick={handleEdit}
          >
            수정
          </CommonBtn>
          <CommonBtn
            styleType="underline"
            className={cx('btns')}
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