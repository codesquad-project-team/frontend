import React, { lazy, Suspense } from 'react';
import classNames from 'classnames/bind';
import styles from './MainPage.scss';
import Header from '../../components/Header/Header';

const cx = classNames.bind(styles);

const PostContainer = lazy(() =>
  import(
    /* webpackChunkName: "post-container" */ '../../components/PostContainer/PostContainer'
  )
);

const MainPage = () => {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('banner')}>
        <div className={cx('banner-text')}>
          <b>Connect Flavor</b>는 비슷한 <b>취향</b>을 가지고 있는 사람들을{' '}
          <b>연결</b>합니다.
          <br /> 그리고 개인의 취향에 따라 할 일을 추천합니다.
        </div>
      </div>
      <Suspense fallback={<div>loading...</div>}>
        <PostContainer headerOn />
      </Suspense>
    </div>
  );
};

export default MainPage;
