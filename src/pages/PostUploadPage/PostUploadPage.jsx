import React, { useMemo, useState, useReducer } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
import { deepDiff } from '../../utils/diff.js';
import { WEB_SERVER_URL } from '../../configs';

const readyToUploadReducer = (prevState, newState) => {
  return { ...prevState, ...newState };
};

const getURLAndIndex = imageURLs => {
  let representativeIndex;
  const URLs = imageURLs.map(({ url, isRepresentative }, idx) => {
    if (isRepresentative) representativeIndex = idx;
    return url;
  });
  return [URLs, representativeIndex];
};

const getInitialPostData = isEditMode => {
  const {
    id,
    place,
    companion,
    activity,
    description,
    images,
    location
  } = JSON.parse(localStorage.getItem('postData'));

  const initialData = {
    readyToUpload: {
      hasSelectedLocation: true
    },
    location,
    post: {
      place,
      companion,
      activity,
      description,
      images
    },
    id
  };
  return isEditMode ? initialData : {};
};
//TODO: 초기렌더링 이후 localStorage 초기화
const PostUploadPage = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const isEditMode = pathname === '/post/edit';

  const initial = useMemo(() => getInitialPostData(isEditMode), []);
  const [initialURLs, initialIdx] = useMemo(
    () => (isEditMode ? getURLAndIndex(initial.post.images) : []),
    []
  );

  const [readyToUpload, setReadyToUpload] = useReducer(
    readyToUploadReducer,
    initial.readyToUpload || {}
  );
  const { hasSelectedLocation, hasAllTitles, isOverDescLimit } = readyToUpload;

  const [selectedLocation, setSelectedLocation] = useState(
    initial.location || {}
  );

  const { longitude, latitude, name } = selectedLocation;

  const _initial = initial.post || {};
  const initialTitle = {
    place: _initial.place,
    companion: _initial.companion,
    activity: _initial.activity
  };
  const [title, setTitle] = useState(initialTitle || '');
  const [description, setDescription] = useState(_initial.description || '');

  const [representativeIndex, setRepresentativeIndex] = useState(
    initialIdx || 0
  );
  const [images, setImages] = useState({
    selectedImages: [],
    previewUrls: initialURLs || []
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

  const mergePreviousImages = S3uploadedURLs => {
    return images.previewUrls
      .filter(URL => !URL.startsWith('data'))
      .concat(S3uploadedURLs);
  };

  const formatURLs = S3uploadedURLs => {
    const URLs = isEditMode
      ? mergePreviousImages(S3uploadedURLs)
      : S3uploadedURLs;

    return URLs.map((url, idx) =>
      representativeIndex === idx
        ? { url, isRepresentative: true }
        : { url, isRepresentative: false }
    );
  };

  const formatData = S3uploadedURLs => {
    const postData = {
      location: selectedLocation,
      post: {
        ...title,
        description,
        images: formatURLs(S3uploadedURLs)
      }
    };
    return postData;
  };

  const getUpdatedValues = (initialData, postData) => {
    const { readyToUpload, id, ...initial } = initialData;
    return deepDiff(initial, postData);
  };

  const requestPostUpload = async postData => {
    const res = await fetch(
      `${WEB_SERVER_URL}/post${isEditMode ? `/${initial.id}` : ''}`,
      {
        method: isEditMode ? 'PUT' : 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      }
    );
    const { id } = isEditMode ? { id: initial.id } : await res.json();

    switch (res.status) {
      case 200:
        history.push(`/post/${id}`);
        break;
      case 401:
        alert('토큰이 유효하지 않습니다. 다시 로그인 해주세요.');
        //TODO: 로그인 모달창 띄우고 지금까지 입력한 데이터는 따로 보관하기
        //로그인 과정에서 새로고침이 발생할 것으로 보임.
        //local storage 활용해야할 것으로 예상.
        break;
      case 500:
        alert('서버에서 에러가 발생했어요. 잠시 후에 다시 시도해주세요.');
        //TODO: 임시저장 기능?
        break;
    }
  };

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
    const hasImagesToUpload = !!images.selectedImages.length;
    const S3uploadedURLs = hasImagesToUpload ? await uploadImagesToS3() : [];
    const formattedData = formatData(S3uploadedURLs);
    const postData = isEditMode
      ? getUpdatedValues(initial, formattedData)
      : formattedData;
    requestPostUpload(postData);
  };

  const handleCancel = () => {
    if (confirm('작성을 취소하고 이전 페이지로 돌아가시겠어요?')) {
      history.goBack();
    }
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
            lat={latitude}
            lng={longitude}
            setSelectedLocation={setSelectedLocation}
            setReadyToUpload={setReadyToUpload}
            hasSelectedLocation={hasSelectedLocation}
          />
          <TitleUploader
            placeName={name}
            title={title}
            setTitle={setTitle}
            setReadyToUpload={setReadyToUpload}
          />
          <DescriptionUploader
            description={description}
            setDescription={setDescription}
            setReadyToUpload={setReadyToUpload}
          />
          {/* TODO: 취향 매칭을 위한 질문 추가하기 */}
          {/* <PostQuestions /> */}
          <div className="post-upload-page-btns">
            <CommonBtn onClick={handleSubmit}>작성</CommonBtn>
            <CommonBtn onClick={handleCancel}>취소</CommonBtn>
          </div>
        </CommonPost>
      </CommonPost.background>
    </>
  );
};

export default PostUploadPage;
