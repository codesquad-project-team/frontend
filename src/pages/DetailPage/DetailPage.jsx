import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
import classNames from 'classnames/bind';
import styles from './DetailPage.scss';
import Header from '../../components/Header/Header';
import DetailPostHeader from '../../components/DetailPostHeader/DetailPostHeader';
import Carousel from '../../components/Carousel/Carousel';
import DetailPost from '../../components/DetailPost/DetailPost';
import MapView from '../../components/MapView/MapView';
import RelatedPost from '../../components/RelatedPost/RelatedPost';
import useFetch from '../../hooks/useFetch';
import { WEB_SERVER_URL, MAIN_COLOR } from '../../configs';

const cx = classNames.bind(styles);

const DetailPage = () => {
  const { postId } = useParams();

  const { data, loading } = useFetch({
    URL: `${WEB_SERVER_URL}/post/${postId}`
  });

  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('contents')}>
        <FadeLoader
          css={override}
          sizeUnit={'px'}
          size={150}
          color={MAIN_COLOR}
          loading={loading}
        />
        {!loading && (
          <>
            <DetailPostHeader
              data={data}
              writerId={data.writer.id}
              postId={postId}
            />
            <Carousel
              className={cx('carousel')}
              data={data.post.images}
              src="url"
            />
            <DetailPost data={data} />
            <MapView data={data} />
            <RelatedPost postId={postId} />
          </>
        )}
      </div>
    </div>
  );
};

export default DetailPage;

const override = css`
  display: block;
  margin: 25rem auto;
`;
