import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import PostContainer from '../../components/PostContainer/PostContainer';
import NewPostBtn from '../../components/NewPostBtn/NewPostBtn';
import CommonLink from '../../components/CommonLink/CommonLink';
import useFetch from '../../hooks/useFetch';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
import { WEB_SERVER_URL, MAIN_COLOR } from '../../configs';
import { useLoginContext } from '../../contexts/LoginContext';

const ProfilePage = () => {
  //TODO: userId를 전역 context에서 받아서 profile-content api 요청하기
  //라우터URL을 nickname으로 표시하기 때문에 prop으로는 userId를 받을 수 없음.
  //따라서 userId는 별도의 방법으로 받아야함. 전역 context를 사용해야할 듯.
  //const { userId } = useContext(someContext);
  const userId = 100;
  const { id } = useLoginContext();
  const isMyProfile = id === userId;

  const [data, setData] = useState({});
  const { error, loading } = useFetch(
    `${WEB_SERVER_URL}/user/profile-content?id=${userId}`,
    { credentials: 'include' },
    setData
  );
  return (
    <div className="profile-page">
      <Header />
      <CommonLink to="/post/upload">
        <NewPostBtn />
      </CommonLink>
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
      <PostContainer api="/post?page=" query={userId} />
    </div>
  );
};

export default ProfilePage;

const override = css`
  display: block;
  margin: 17rem auto;
`;
