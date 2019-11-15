import React, { useState } from "react";
import "./PostUploadPage.scss";
import CommonPost from "../../components/CommonPost/CommonPost";
import Header from "../../components/Header/Header";
import ImageUploader from "../../components/PostUploader/ImageUploader";
import LocationUploader from "../../components/PostUploader/LocationUploader";
import TitleUploader from "../../components/PostUploader/TitleUploader";
import CommentUploader from "../../components/PostUploader/CommentUploader";
import PostQuestions from "../../components/PostUploader/PostQuestions";
import CommonBtn from "../../components/CommonBtn/CommonBtn";

const PostUploadPage = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const addImageHandler = newImages => {
    setSelectedImages([...newImages, ...selectedImages]);
  };

  const deleteImageHandler = () => {
    // images에서 입력한 image 삭제하고 setImages
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  console.log(selectedImages);

  return (
    <>
      <Header />
      <CommonPost.background className="post-upload-page-background">
        <CommonPost large className="post-upload-page">
          <ImageUploader
            selectedImages={selectedImages}
            addImageHandler={addImageHandler}
            deleteImageHandler={deleteImageHandler}
          />
          <LocationUploader />
          <TitleUploader />
          <CommentUploader />
          <PostQuestions />
          <form className="post-upload-page-btns" onSubmit={handleSubmit}>
            <CommonBtn>작성</CommonBtn>
            <CommonBtn>취소</CommonBtn>
          </form>
        </CommonPost>
      </CommonPost.background>
    </>
  );
};

export default PostUploadPage;
