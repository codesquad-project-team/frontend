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

const ProfilePage = props => {
  //TODO: userId를 넘겨받아서 요청보내도록 수정 예정
  // const userId = props.userId //match.params에서 넘겨주는 userId
  const userId = 1;
  const [data, setData] = useState(null);
  const { error, loading } = useFetch(
    `${WEB_SERVER_URL}/user/profile-content?id=${userId}`,
    {},
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
      {data && <ProfileInfo data={data} />}
      <PostContainer api="/post?page=" />
    </div>
  );
};

export default ProfilePage;

const override = css`
  display: block;
  margin: 17rem auto;
`;
