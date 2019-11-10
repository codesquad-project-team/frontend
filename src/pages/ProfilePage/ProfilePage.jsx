import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import PostContainer from '../../components/PostContainer/PostContainer';
import NewPostBtn from '../../components/NewPostBtn/NewPostBtn';
import useFetch from '../../hooks/useFetch';
import { WEB_SERVER_URL } from '../../configs';

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
      <Link to="/post/upload">
        <NewPostBtn />
      </Link>
      {data && <ProfileInfo data={data} />}
      <PostContainer api="/post?page=" />
    </div>
  );
};

export default ProfilePage;
