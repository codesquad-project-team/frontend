import React from 'react';
import './MainPage.scss';
import Header from '../../components/Header/Header';
import PostContainer from '../../components/PostContainer/PostContainer';

const data = {
  hasNextPage: true,
  items: [
    { title: 'test1' },
    { title: 'test2' },
    { title: 'test3' },
    { title: 'test3' },
    { title: 'test3' }
  ]
};

const MainPage = () => {
  //const { setInfiniteScroll } = useInfiniteScroll()
  return (
    <div className="main-page">
      <Header />
      <PostContainer items={data.items} />
    </div>
  );
};

export default MainPage;
