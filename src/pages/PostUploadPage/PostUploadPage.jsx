import React, { useState } from 'react';
import './PostUploadPage.scss';
import CommonPost from '../../components/CommonPost/CommonPost';
import Header from '../../components/Header/Header';
import ImageUploader from '../../components/PostUploader/ImageUploader';
import LocationUploader from '../../components/PostUploader/LocationUploader';
import TitleUploader from '../../components/PostUploader/TitleUploader';
import CommentUploader from '../../components/PostUploader/CommentUploader';
import PostQuestions from '../../components/PostUploader/PostQuestions';
import CommonBtn from '../../components/CommonBtn/CommonBtn';

const PostUploadPage = () => {
  const [images, setImages] = useState({
    selectedImages: [],
    previewUrls: []
  });

  const addImageHandler = files => {
    /* Map each file to a promise that resolves to an array of image URI's */

    Promise.all(
      files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener('load', ({ target }) => {
            resolve(target.result);
          });
          reader.readAsDataURL(file);
        });
      })
    ).then(
      urls => {
        /* Once all promises are resolved, update state with image URI array */
        setImages({
          selectedImages: [...images.selectedImages, ...files],
          previewUrls: [...images.previewUrls, ...urls]
        });
      },
      error => {
        console.error(error);
      }
    );
  };

  const deleteImageHandler = e => {
    e.preventDefault();
    // const deletedImage = e.target.previousSibling.src;

    // console.log(deletedImage);

    // const newSelectedImages = imagesPreviewUrls.filter(
    //   el => el !== deletedImage
    // );
    // console.log(newSelectedImages);
    // 해당 이미지를 selectedImage 에서 삭제하고 다시 addImageHandler 실행?
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <CommonPost.background className="post-upload-page-background">
        <CommonPost large className="post-upload-page">
          <ImageUploader
            images={images}
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
