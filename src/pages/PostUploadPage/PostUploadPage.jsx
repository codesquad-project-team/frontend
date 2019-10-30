import React from 'react';
import './PostUploadPage.scss';
import CommonCard from '../../components/CommonCard/CommonCard';
import Header from '../../components/Header/Header';

const PostUploadPage = () => {
  return (
    <>
      <Header />
      <CommonCard.background>
        <CommonCard large>
          <input type="file" />
          <input type="text" placeholder="어디에서" />
          <input type="text" placeholder="누구랑" />
          <input type="text" placeholder="뭐하기" />
          <textarea name="comment" id="" cols="30" rows="10" />
        </CommonCard>
      </CommonCard.background>
    </>
  );
};

export default PostUploadPage;
