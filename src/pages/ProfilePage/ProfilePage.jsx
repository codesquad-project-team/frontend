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
  //로그아웃 상태에서 myId값이 undefined이므로 isMyProfile이 true값이 나오지 않도록 userId 기본값을 null로 설정.
  const { pathname, state: { userId } = { userId: null } } = useLocation();
  const nickname = pathname.replace('/profile/@', '');

  const { id: myId, nickname: myNickname } = useLoginContext();
  const isMyProfile = myId === userId || myNickname === nickname;

  const [data, setData] = useState({});

  //db의 primary key는 userId이지만 주소창에 닉네임을 직접 입력하는 경우에도 프로필 불러오기 위해 2가지 쿼리 사용.
  const query = userId ? `id=${userId}` : `nickname=${nickname}`;
  const { loading, refetch } = useFetch({
    URL: `${WEB_SERVER_URL}/user/profile-content?${query}`,
    options: { credentials: 'include' },
    callback: setData
  });

  //로그아웃 시 refetch해서 profile 정보 갱신
  useEffect(() => {
    const isInitialRendering = !Object.keys(data).length;
    if (isInitialRendering) return;
    refetch();
  }, [myId]);

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
        <ProfileInfo
          data={data}
          isMyProfile={isMyProfile}
          userId={userId || data.id}
        />
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
