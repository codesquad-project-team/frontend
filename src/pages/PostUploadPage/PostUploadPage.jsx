import React from 'react';
import './PostUploadPage.scss';
import CommonCard from '../../components/CommonCard/CommonCard';
import Header from '../../components/Header/Header';
import ImageUploader from '../../components/PostUploader/ImageUploader';
import LocationUploader from '../../components/PostUploader/LocationUploader';
import TitleUploader from '../../components/PostUploader/TitleUploader';
import CommentUploader from '../../components/PostUploader/CommentUploader';
import PostQuestions from '../../components/PostUploader/PostQuestions';
import CommonBtn from '../../components/CommonBtn/CommonBtn';

const PostUploadPage = () => {
  return (
    <>
      <Header />
      <CommonCard.background className="post-upload-page-background">
        <CommonCard large className="post-upload-page">
          <ImageUploader />
          <LocationUploader />
          <TitleUploader />
          <CommentUploader />
          <PostQuestions />
          <div className="post-upload-page-btns">
            <CommonBtn>작성</CommonBtn>
            <CommonBtn>취소</CommonBtn>
          </div>
        </CommonCard>
      </CommonCard.background>
    </>
  );
};

export default PostUploadPage;
