import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
import Header from '../../components/Header/Header';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import PostContainer from '../../components/PostContainer/PostContainer';
import useFetch from '../../hooks/useFetch';
import { MAIN_COLOR } from '../../configs';
import { useLoginContext } from '../../contexts/LoginContext';
import api from '../../api';

const ProfilePage = () => {
  //로그아웃 상태에서 myId값이 undefined이므로 isMyProfile이 true값이 나오지 않도록 targetId 기본값을 null로 설정.
  const { pathname, state: { targetId } = { targetId: null } } = useLocation();
  const nickname = pathname.replace('/profile/@', '');

  const { id: myId, nickname: myNickname } = useLoginContext();
  const isMyProfile = myId === targetId || myNickname === nickname;

  const [data, setData] = useState({});

  const { loading, request: refetch } = useFetch({
    onRequest: () => api.getProfile(targetId, nickname),
    onSuccess: setData,
    watch: [targetId, nickname],
    loadStatus: true
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
          userId={targetId || data.id}
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
