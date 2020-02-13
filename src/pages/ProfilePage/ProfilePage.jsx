import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import PostContainer from '../../components/PostContainer/PostContainer';
import useFetch from '../../hooks/useFetch';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
import { WEB_SERVER_URL, MAIN_COLOR } from '../../configs';
import { useLoginContext } from '../../contexts/LoginContext';

const ProfilePage = () => {
  //라우터URL을 nickname으로 표시하기 때문에 router의 prop으로는 userId를 받을 수 없음.
  //따라서 localStorage를 활용하여 userId 값을 저장하여 사용함.
  //추가로, 사용자 프로필을 보는 도중 로그인할 경우 userId값을 보존하기 위해서 localStorage사용.(로그인 시 새로고침 발생)
  const { pathname } = useLocation();
  const nickname = pathname.replace('/profile/@', '');
  const userId = JSON.parse(localStorage.getItem('targetUserId'));

  const { id: myId, nickname: myNickname } = useLoginContext();
  const isMyProfile = myId === userId || myNickname === nickname;

  const [data, setData] = useState({});

  const query = userId ? `id=${userId}` : `nickname=${nickname}`;
  const { error, loading, refetch } = useFetch(
    `${WEB_SERVER_URL}/user/profile-content?${query}`,
    { credentials: 'include' },
    setData
  );

  const isInitialRendering = !Object.keys(data).length;
  //로그아웃 시 refetch해서 profile 정보 갱신
  useEffect(() => {
    if (isInitialRendering) return;
    refetch();
  }, [myId]);

  //주소창에 다른 닉네임 입력한 경우 nickname으로 정보 갱신
  useEffect(() => {
    if (isInitialRendering) return;
    localStorage.removeItem('targetUserId');
  }, [nickname]);

  return (
    <div>
      <Header />
      <FadeLoader
        css={override}
        sizeUnit={'px'}
        size={150}
        color={MAIN_COLOR}
        loading={loading}
      />
      {!loading && (
        <ProfileInfo data={data} isMyProfile={isMyProfile} userId={userId} />
      )}
      {data.id && <PostContainer writerId={data.id} />}
    </div>
  );
};

export default ProfilePage;

const override = css`
  display: block;
  margin: 17rem auto;
`;
