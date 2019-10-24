import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import PostContainer from '../../components/PostContainer/PostContainer';
import useFetch from '../../hooks/useFetch';
import { WEB_SERVER_URL } from '../../configs';

const data = {
  nickname: 'Mi-Shell',
  totalPost: 5331,
  totalFollower: 10128,
  totalFollowing: 1079,
  introduction: "I'm Coffee Holic!",
  profileImage:
    'https://team-project-s3-bucket.s3.ap-northeast-2.amazonaws.com/profile-images/dummyUser%40google.com/myProfile.png'
};

const ProfilePage = () => {
  //TODO: api완성 시 수정 예정
  // const [data, setData] = useState(null);
  // const {error, loading} = useFetch(`${WEB_SERVER_URL}/someapi...`, {}, setData)
  return (
    <div className="profile-page">
      <Header />
      <ProfileInfo data={data} />
      <PostContainer api="/post?page=" />
    </div>
  );
};

export default ProfilePage;
