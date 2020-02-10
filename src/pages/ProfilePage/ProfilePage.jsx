import React, { useState } from 'react';
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
  const userId = JSON.parse(localStorage.getItem('targetUserId'));
  const { id } = useLoginContext();
  const isMyProfile = id === userId;

  const [data, setData] = useState({});
  const { error, loading } = useFetch(
    `${WEB_SERVER_URL}/user/profile-content?id=${userId}`,
    { credentials: 'include' },
    setData
  );
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
      <PostContainer writerId={userId} />
    </div>
  );
};

export default ProfilePage;

const override = css`
  display: block;
  margin: 17rem auto;
`;
