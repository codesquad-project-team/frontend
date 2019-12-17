import React, { useState } from 'react';
import './PostUploadPage.scss';
import CommonPost from '../../components/CommonPost/CommonPost';
import Header from '../../components/Header/Header';
import ImageUploader from '../../components/PostUploader/ImageUploader/ImageUploader';
import LocationUploader from '../../components/PostUploader/LocationUploader/LocationUploader';
import TitleUploader from '../../components/PostUploader/TitleUploader';
import DescriptionUploader from '../../components/PostUploader/DescriptionUploader';
import PostQuestions from '../../components/PostUploader/PostQuestions';
import CommonBtn from '../../components/CommonBtn/CommonBtn';
import useS3 from '../../hooks/useS3';
import useScript from '../../hooks/useScript';
import { useLoginContext } from '../../contexts/LoginContext';
import { YYYYMMDDHHMMSS } from '../../utils/utils';

const PostUploadPage = () => {
  const [readyToUpload, setReadyToUpload] = useState(false);
  const { hasSelectedLocation, hasAllTitles, isOverDescLimit } = readyToUpload;

  const [selectedLocation, setSelectedLocation] = useState({});
  const {
    x: lng,
    y: lat,
    place_name: placeName,
    road_address_name: address,
    place_url: link,
    phone
  } = selectedLocation;

  const [description, setDescription] = useState(null);
  const [title, setTitle] = useState({});
  const { title_location, title_companion, title_activity } = title;

  const [representativeIndex, setRepresentativeIndex] = useState(0);
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

  const showUploadFailReason = () => {
    switch (true) {
      case !images.previewUrls.length:
        alert('사진을 1개 이상 선택해주세요.');
        break;
      case !hasSelectedLocation:
        alert('장소검색 버튼을 눌러 장소를 선택해주세요.');
        break;
      case !hasAllTitles:
        alert('어디에서 누구랑 무엇을 했는지 알려주지 않을래요?');
        break;
      case isOverDescLimit:
        alert('설명을 1000자 이하로 입력해주세요.');
        break;
    }
  };

  const uploadImagesToS3 = () => {
    if (loadError) {
      return alert(
        `필요한 스크립트를 로드하지 못했습니다. 다음에 다시 시도해주세요.`
      );
    }

    const albumName = nickname.concat('_', YYYYMMDDHHMMSS(new Date())).trim();
    const albumNamePrefix = 'post-images/';

    const S3uploadedURLs = S3imageUploadHandler(
      albumName,
      albumNamePrefix,
      images.selectedImages,
      setImageUploadError
    );
    return S3uploadedURLs;
  };

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
        description,
        images: S3uploadedURLs.map((url, idx) =>
          representativeIndex === idx
            ? { url, is_representative: true }
            : { url, is_representative: false }
        )
      }
    };
    return postData;
  };

  const requestPostUpload = postData => {};

  const handleSubmit = async e => {
    e.preventDefault();

    const needsMoreData =
      !images.previewUrls.length ||
      !hasSelectedLocation ||
      !hasAllTitles ||
      isOverDescLimit;
    if (needsMoreData) {
      showUploadFailReason();
      return;
    }

    const S3uploadedURLs = await uploadImagesToS3();
    const postData = getPostData(S3uploadedURLs);
    requestPostUpload(postData);
  };

  return (
    <>
      <Header />
      <CommonPost.background className="post-upload-page-background">
        <CommonPost large className="post-upload-page">
          <ImageUploader
            images={images}
            setImages={setImages}
            representativeIndex={representativeIndex}
            setRepresentativeIndex={setRepresentativeIndex}
          />
          <LocationUploader
            lat={lat}
            lng={lng}
            setSelectedLocation={setSelectedLocation}
            setReadyToUpload={setReadyToUpload}
            hasSelectedLocation={hasSelectedLocation}
          />
          <TitleUploader
            placeName={placeName}
            setTitle={setTitle}
            setReadyToUpload={setReadyToUpload}
          />
          <DescriptionUploader
            description={description}
            setDescription={setDescription}
            setReadyToUpload={setReadyToUpload}
          />
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
