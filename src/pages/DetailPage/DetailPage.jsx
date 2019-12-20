import React, { useState } from 'react';
import DetailPost from '../../components/DetailPost/DetailPost';
import LocationCarousel from '../../components/LocationCarousel/LocationCarousel';
import RelatedPost from '../../components/RelatedPost/RelatedPost';
import './DetailPage.scss';
import Header from '../../components/Header/Header';
import MapView from '../../components/MapView/MapView';
import useFetch from '../../hooks/useFetch';
import { WEB_SERVER_URL, MAIN_COLOR } from '../../configs';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';

const DetailPage = props => {
  const postId = props.id;
  const [data, setData] = useState({});

  const { error, loading } = useFetch(
    `${WEB_SERVER_URL}/post/${postId}`,
    {},
    json => setData(json)
  );

  return (
    <div className="detail-page">
      <Header />
      <div className="detail-page-contents">
        <FadeLoader
          css={override}
          sizeUnit={'px'}
          size={150}
          color={MAIN_COLOR}
          loading={loading}
        />
        {!loading && (
          <>
            <LocationCarousel data={data} />
            <DetailPost data={data} />
            <MapView data={data} />
            <RelatedPost />
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
