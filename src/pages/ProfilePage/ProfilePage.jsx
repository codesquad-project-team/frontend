import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import PostContainer from '../../components/PostContainer/PostContainer';
import NewPostBtn from '../../components/NewPostBtn/NewPostBtn';
import useFetch from '../../hooks/useFetch';
import { WEB_SERVER_URL } from '../../configs';

const data = {
  isMyProfile: true,
  nickname: 'Mi-Shell',
  totalPost: 5331,
  totalFollower: 10128,
  totalFollowing: 1079,
  introduction: 'Coffee Holic. Love Beer.',
  profileImage:
    'https://team-project-s3-bucket.s3.ap-northeast-2.amazonaws.com/profile-images/dummyUser%40google.com/myProfile.png'
};

const ProfilePage = props => {
  //TODO: api완성 시 수정 예정
  // const userId = props.userId //match.params에서 넘겨주는 userId
  // const [data, setData] = useState(null);
  // const {error, loading} = useFetch(`${WEB_SERVER_URL}/someapi...`, {}, setData)
  return (
    <div className="profile-page">
      <Header />
      <Link to="/post/upload">
        <NewPostBtn />
      </Link>
      <ProfileInfo data={data} />
      <PostContainer api="/post?page=" />
    </div>
  );
};

export default ProfilePage;
