import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import CommonBtn from '../CommonBtn/CommonBtn';
import { useLoginContext } from '../../contexts/LoginContext';
import useFetch from '../../hooks/useFetch';
import api from '../../api';
import styles from './DetailPostHeader.scss';

const cx = classNames.bind(styles);

const DetailPostHeader = ({ data, writerId, postId }) => {
  const history = useHistory();
  const [isFirstMouseOver, setIsFirstMouseOver] = useState(true);
  const { id, nickname } = useLoginContext();
  const isMyPost = id === writerId;

  const savePostData = () => {
    localStorage.setItem('postData', JSON.stringify(data));
  };

  //TODO: 모바일에서는 클릭시 save 하도록 수정
  const handleMouseOver = () => {
    if (!isFirstMouseOver) return;
    savePostData();
    setIsFirstMouseOver(false);
  };

  const handleEdit = () => {
    history.push('/post/edit');
  };

  const { request } = useFetch({
    onRequest: () => api.deletePost(postId),
    onSuccess: () => goToProfilePage(),
    onError: {
      400: () => console.error('not exist postId'),
      401: () => console.error('unthorized'),
      500: '서버에서 문제가 생겼나봐요. 잠시 후에 다시 시도해주세요.'
    }
  });

  const goToProfilePage = () => {
    alert('게시글이 삭제되었습니다.'); //TODO: 렌더링을 막지않는 모달로 띄우고 바로 페이지 이동
    history.push(`/profile/@${nickname}`, { targetId: id });
  };

  const handleDelete = () => {
    if (!confirm('정말 삭제하시겠어요?')) return;
    request();
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
