import React, { useState, useEffect } from 'react';
import './MainPage.scss';
import Header from '../../components/Header/Header';
import PostContainer from '../../components/PostContainer/PostContainer';

const MainPage = () => {
  return (
    <div className="main-page">
      <Header />
      <div className="main-page-banner">
        <div className="main-page-banner-text">
          <b>Connect Flavor</b>는 비슷한 <b>취향</b>을 가지고 있는 사람들을{' '}
          <b>연결</b>합니다. 그리고 개인에게 현재의 감정 상태에 따라 할 일을
          추천합니다.
        </div>
      </div>
      <PostContainer headerOn api="/post?page=" />
    </div>
  );
};

export default MainPage;
