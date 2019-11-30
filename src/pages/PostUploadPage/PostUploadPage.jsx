import React, { useState } from 'react';
import './PostUploadPage.scss';
import CommonPost from '../../components/CommonPost/CommonPost';
import Header from '../../components/Header/Header';
import ImageUploader from '../../components/PostUploader/ImageUploader/ImageUploader';
import LocationUploader from '../../components/PostUploader/LocationUploader';
import TitleUploader from '../../components/PostUploader/TitleUploader';
import CommentUploader from '../../components/PostUploader/CommentUploader';
import PostQuestions from '../../components/PostUploader/PostQuestions';
import CommonBtn from '../../components/CommonBtn/CommonBtn';
import useS3 from '../../hooks/useS3';
import useScript from '../../hooks/useScript';
import { useLoginContext } from '../../contexts/LoginContext';
import { YYYYMMDDHHMMSS } from '../../utils/utils';

const PostUploadPage = () => {
  const [images, setImages] = useState({
    selectedImages: [],
    previewUrls: []
  });

  const [representativeIndex, setRepresentativeIndex] = useState(0);

  const { nickname } = useLoginContext();

  const { loading, error } = useScript(
    'https://sdk.amazonaws.com/js/aws-sdk-2.283.1.min.js'
  );

  const { initS3, deleteS3, createAlbum, addImage } = useS3(loading, error);

  const addImageHandler = files => {
    /* Map each file to a promise that resolves to an array of image URI's */
    Promise.all(
      files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener('load', ({ target }) => {
            resolve(target.result);
          });
          reader.readAsDataURL(file); // file을 읽기 가능한 url로 변환하여 target의 result 속성에 넣는다.
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
    const deletedImage = e.target.previousSibling.src;
    const targetIndex = images.previewUrls.findIndex(
      url => url === deletedImage
    );

    if (targetIndex === representativeIndex) {
      !targetIndex
        ? setRepresentativeIndex(0)
        : setRepresentativeIndex(targetIndex - 1);
    }

    setImages({
      selectedImages: removeItemWithSlice(images.selectedImages, targetIndex),
      previewUrls: removeItemWithSlice(images.previewUrls, targetIndex)
    });
  };

  const removeItemWithSlice = (arr, index) => {
    const firstArr = arr.slice(0, index);
    const secondArr = arr.slice(index + 1);
    return [...firstArr, ...secondArr];
  };

  const selectRepresentativeImage = e => {
    const represenTativeImage = e.target.previousSibling.previousSibling.src;
    const represenTativeIndex = images.previewUrls.findIndex(
      el => el === represenTativeImage
    );

    setRepresentativeIndex(represenTativeIndex);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const s3 = await initS3();
    const albumKey = await createAlbum(
      s3,
      nickname,
      YYYYMMDDHHMMSS(new Date())
    );
    const uploadedUrl = await addImage(images.selectedImages, albumKey);
    await deleteS3(s3, albumKey);
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
            representativeImageHandler={selectRepresentativeImage}
            representativeIndex={representativeIndex}
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
