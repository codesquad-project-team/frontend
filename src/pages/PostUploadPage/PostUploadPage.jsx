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
import useScript from '../../hooks/useScript';
import { useLoginContext } from '../../contexts/LoginContext';
import { YYYYMMDDHHMMSS } from '../../utils/utils';

const PostUploadPage = () => {
  const [selectedLocation, setSelectedLocation] = useState({});
  const {
    x: lng,
    y: lat,
    place_name: placeName,
    road_address_name: address,
    place_url: link,
    phone
  } = selectedLocation;

  const [title, setTitle] = useState({});
  const { title_location, title_companion, title_activity } = title;

  const [images, setImages] = useState({
    selectedImages: [],
    previewUrls: []
  });

  const { nickname } = useLoginContext();

  const { loadError } = useScript(
    'https://sdk.amazonaws.com/js/aws-sdk-2.283.1.min.js'
  );
  const [imageUploadError, setImageUploadError] = useState(false);
  // TODO : loadError, imageUploadError 등 PostUploadPage 에서 나올 수 있는 error 를 어떻게 관리해야 할지 고민 중

  const { S3imageUploadHandler } = useS3();

  const getPostData = S3uploadedURLs => {
    const postData = {
      location: {
        name: placeName,
        latitude: Number(lat),
        longitude: Number(lng),
        address,
        link,
        phone
      },
      post: {
        title_location,
        title_companion,
        title_activity,
        description: 'string',
        images: [
          {
            url: 'string',
            is_representative: true
          }
        ]
      }
    };
    return postData;
  };

  const requestPostUpload = postData => {};

  const handleSubmit = async e => {
    e.preventDefault();

    const existsSelectedLocation = lat ? true : false;
    const existsTitle = title ? true : false;
    // if (!existsSelectedLocation || !existsTitle) return;

    if (loadError) {
      return alert(
        `필요한 스크립트를 로드하지 못했습니다. 다음에 다시 시도해주세요.`
      );
    }

    const albumName = nickname.concat('_', YYYYMMDDHHMMSS(new Date())).trim();
    const albumNamePrefix = 'post-images/';

    const S3uploadedURLs = await S3imageUploadHandler(
      albumName,
      albumNamePrefix,
      images.selectedImages,
      setImageUploadError
    );

    const postData = getPostData(S3uploadedURLs);
    requestPostUpload(postData);
  };

  return (
    <>
      <Header />
      <CommonPost.background className="post-upload-page-background">
        <CommonPost large className="post-upload-page">
          <ImageUploader images={images} setImages={setImages} />
          <LocationUploader
            lat={lat}
            lng={lng}
            setSelectedLocation={setSelectedLocation}
          />
          <TitleUploader placeName={placeName} setTitle={setTitle} />
          <CommentUploader />
          <PostQuestions />
          <div className="post-upload-page-btns">
            <CommonBtn onClick={handleSubmit}>작성</CommonBtn>
            <CommonBtn>취소</CommonBtn>
          </div>
        </CommonPost>
      </CommonPost.background>
    </>
  );
};

export default PostUploadPage;
