import React, { useState } from 'react';
import './PostUploadPage.scss';
import CommonPost from '../../components/CommonPost/CommonPost';
import Header from '../../components/Header/Header';
import ImageUploader from '../../components/PostUploader/ImageUploader/ImageUploader';
import LocationUploader from '../../components/PostUploader/LocationUploader/LocationUploader';
import TitleUploader from '../../components/PostUploader/TitleUploader';
import CommentUploader from '../../components/PostUploader/CommentUploader';
import PostQuestions from '../../components/PostUploader/PostQuestions';
import CommonBtn from '../../components/CommonBtn/CommonBtn';
import useS3 from '../../hooks/useS3';
import { YYYYMMDDHHMMSS } from '../../utils/utils';

const PostUploadPage = () => {
  const [selectedLocation, setSelectedLocation] = useState({});
  const { x: lng, y: lat, place_name: placeName } = selectedLocation;

  const [images, setImages] = useState({
    selectedImages: [],
    previewUrls: []
  });

  const [representativeIndex, setRepresentativeIndex] = useState(0);

  const { s3, createAlbum, addImage } = useS3();

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

    // TODO : 브라우저의 토큰에 저장되어 있는 쿠키에서 user nickname 가져오는 코드 추가
    const albumName = await createAlbum('michelle', YYYYMMDDHHMMSS(new Date()));

    const uploadedUrl = await addImage(images.selectedImages, albumName);
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
          <LocationUploader
            lat={lat}
            lng={lng}
            setSelectedLocation={setSelectedLocation}
          />
          <TitleUploader placeName={placeName} />
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
