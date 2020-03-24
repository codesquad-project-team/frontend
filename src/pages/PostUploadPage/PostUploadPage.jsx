import React, { useEffect, useMemo, useState, useReducer } from 'react';
import { useHistory, useLocation, Prompt } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './PostUploadPage.scss';
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
import useReducerMiddleware from '../../hooks/useReducerMiddleware';
import { useLoginContext } from '../../contexts/LoginContext';
import { YYYYMMDDHHMMSS } from '../../utils/utils';
import { deepDiff } from '../../utils/diff.js';
import middleware from './middleware';
import reducer, { getLocalStorageImages } from './reducer';
import useFetch from '../../hooks/useFetch';
import api from '../../api';

const cx = classNames.bind(styles);

const readyToUploadReducer = (prevState, newState) => {
  return { ...prevState, ...newState };
};

const getInitialPostData = isEditMode =>
  isEditMode
    ? JSON.parse(localStorage.getItem('postData'))
    : { post: {}, location: {} };

const PostUploadPage = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const isEditMode = pathname === '/post/edit';

  const { writer, ...initial } = useMemo(
    () => getInitialPostData(isEditMode),
    []
  );
  const {
    images: initialImages,
    description: initialDesc,
    id,
    ...initialTitle
  } = initial.post;

  const [
    { hasSelectedLocation, hasAllTitles, isOverDescLimit },
    setReadyToUpload
  ] = useReducer(
    readyToUploadReducer,
    isEditMode ? { hasSelectedLocation: true } : {}
  );
  const [isEdited, setIsEdited] = useState(false);

  const bindUpdater = updater => param => {
    updater(param);
    setIsEdited(true);
  };
  const [images, dispatch] = useReducerMiddleware(
    reducer,
    isEditMode ? getLocalStorageImages(initialImages) : [],
    middleware
  );

  const [selectedLocation, setSelectedLocation] = useState(initial.location);
  const { longitude, latitude, name } = selectedLocation;

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDesc);

  const { nickname, loggedIn, openSigninModal } = useLoginContext();

  const { loadError } = useScript(
    'https://sdk.amazonaws.com/js/aws-sdk-2.283.1.min.js'
  );
  const [imageUploadError, setImageUploadError] = useState(false);
  // TODO : loadError, imageUploadError 등 PostUploadPage 에서 나올 수 있는 error 를 어떻게 관리해야 할지 고민 중

  const { S3imageUploadHandler } = useS3();

  const uploadImagesToS3 = () => {
    if (loadError) {
      return alert(
        `필요한 스크립트를 로드하지 못했습니다. 다음에 다시 시도해주세요.`
      );
    }

    const S3uploadedURLs = S3imageUploadHandler({
      albumName: nickname.concat('_', YYYYMMDDHHMMSS(new Date())).trim(),
      albumNamePrefix: 'post-images/',
      images: images
        .filter(({ previewURL }) => previewURL.startsWith('data'))
        .map(({ forUpload }) => forUpload),
      setImageUploadError
    });
    return S3uploadedURLs;
  };

  const mergePreviousImages = (images, S3uploadedURLs) => {
    return images
      .filter(({ previewURL }) => previewURL.startsWith('http'))
      .map(({ previewURL }) => previewURL)
      .concat(S3uploadedURLs);
  };

  const formatURLs = (images, S3uploadedURLs) => {
    const URLs = isEditMode
      ? mergePreviousImages(images, S3uploadedURLs)
      : S3uploadedURLs;

    return images.map(({ isRepresentative }, idx) => ({
      url: URLs[idx],
      isRepresentative
    }));
  };

  const formatData = S3uploadedURLs => {
    const postData = {
      location: selectedLocation,
      post: {
        ...title,
        description,
        images: formatURLs(images, S3uploadedURLs)
      }
    };
    return postData;
  };

  const getUpdatedValues = (initialData, postData) => {
    return deepDiff(initialData, postData);
  };

  const { request } = useFetch({
    onRequest: postData => api.uploadPost(isEditMode, id, postData),
    onSuccess: ({ id: postId }) => goPostDetailPage(postId || id), //PUT의 경우엔 res.body가 없으므로 id를 직접 전달
    onError: {
      //TODO: 401 - 로그인 모달창 띄우고 지금까지 입력한 데이터는 따로 보관하기
      401: '토큰이 유효하지 않습니다. 다시 로그인 해주세요.',
      //TODO: 500 - 임시저장 기능
      500: '서버에서 에러가 발생했어요. 잠시 후에 다시 시도해주세요.'
    }
  });
  const goPostDetailPage = postId => {
    setIsEdited(false);
    history.push(`/post/${postId}`);
  };
  const requestPostUpload = postData => {
    request(postData);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isSubmitReady()) {
      showUploadFailReason();
      return;
    }
    const hasImagesToUpload = !!images.filter(({ previewURL }) =>
      previewURL.startsWith('data')
    ).length;
    const S3uploadedURLs = hasImagesToUpload ? await uploadImagesToS3() : [];
    const formattedData = formatData(S3uploadedURLs);
    const postData = isEditMode
      ? getUpdatedValues(initial, formattedData)
      : formattedData;
    requestPostUpload(postData);
  };

  const isSubmitReady = () =>
    images.length && hasSelectedLocation && hasAllTitles && !isOverDescLimit;

  const showUploadFailReason = () => {
    switch (true) {
      case !images.length:
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

  const handleCancel = () => history.goBack();

  //업로드|수정 페이지에서 로그아웃 시, 또는 로그아웃 상태에서 직접 접근시 로그인 모달 띄우기
  useEffect(() => {
    if (loggedIn) return;
    setIsEdited(false); //Prompt 컴포넌트 동작을 막기 위해서 상태 초기화.
    openSigninModal();
  }, [loggedIn]);

  return (
    <>
      <Prompt
        when={isEdited}
        message={'작성을 취소하고 페이지를 나가시겠어요?'}
      />
      <Header />
      <CommonPost.background className={cx('background')}>
        <CommonPost large className={cx('wrapper')}>
          <ImageUploader images={images} dispatch={bindUpdater(dispatch)} />
          <LocationUploader
            lat={latitude}
            lng={longitude}
            setSelectedLocation={bindUpdater(setSelectedLocation)}
            setReadyToUpload={setReadyToUpload}
            hasSelectedLocation={hasSelectedLocation}
          />
          <TitleUploader
            placeName={name}
            title={title}
            setTitle={bindUpdater(setTitle)}
            setReadyToUpload={setReadyToUpload}
          />
          <DescriptionUploader
            description={description}
            setDescription={bindUpdater(setDescription)}
            setReadyToUpload={setReadyToUpload}
          />
          {/* TODO: 취향 매칭을 위한 질문 추가하기 */}
          {/* <PostQuestions /> */}
          <div className={cx('btns')}>
            <CommonBtn onClick={handleSubmit}>작성</CommonBtn>
            <CommonBtn onClick={handleCancel}>취소</CommonBtn>
          </div>
        </CommonPost>
      </CommonPost.background>
    </>
  );
};

export default PostUploadPage;
