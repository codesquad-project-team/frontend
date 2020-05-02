import React, { useEffect, useMemo, useReducer } from 'react';
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
import useScript from '../../hooks/useScript';
import useMiddleware from '../../hooks/useMiddleware';
import { useLoginContext } from '../../contexts/LoginContext';
import middleware from './middleware';
import logger from '../../utils/loggerMiddleware';
import reducer, { getLocalStorageImages } from '../../reducers/PostUploadPage';
import useFetch from '../../hooks/useFetch';
import api from '../../api';
import useUploadStatus from '../../hooks/useUploadStatus';
import { hasImagesToUpload, uploadImagesToS3, createPostBody } from './helper';

const cx = classNames.bind(styles);

const getInitialPostData = (isEditMode) =>
  isEditMode
    ? JSON.parse(localStorage.getItem('postData'))
    : { post: {}, location: {} };

const PostUploadPage = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const isEditMode = pathname === '/post/edit';
  const { nickname, loggedIn, openSigninModal } = useLoginContext();

  const { writer, ...initialData } = useMemo(
    () => getInitialPostData(isEditMode),
    []
  );
  const {
    post: { id: postId, images: initialImages },
  } = initialData;

  const [images, imageDispatch] = useMiddleware(
    reducer,
    isEditMode ? getLocalStorageImages(initialImages) : [],
    [middleware, logger]
  );

  const [
    setUploadStatus,
    isSubmitReady,
    showUploadFailReason,
  ] = useUploadStatus(images, isEditMode);

  const [state, dispatch] = useReducer(reducer, initialData);

  const { loadError } = useScript(
    'https://sdk.amazonaws.com/js/aws-sdk-2.283.1.min.js'
  );

  const { request: requestPostUpload } = useFetch({
    onRequest: (postData) => api.uploadPost(isEditMode, postId, postData),
    onSuccess: ({ id /* 생성된 postId */ }) => goToPostDetailPage(id || postId), //PUT의 경우엔 res.body가 없으므로 postId를 직접 전달
    onError: {
      //TODO: 401 - 로그인 모달창 띄우고 지금까지 입력한 데이터는 따로 보관하기
      401: '토큰이 유효하지 않습니다. 다시 로그인 해주세요.',
      //TODO: 500 - 임시저장 기능
      500: '서버에서 에러가 발생했어요. 잠시 후에 다시 시도해주세요.',
    },
  });
  const goToPostDetailPage = (postId) => {
    dispatch({ type: 'resetEditStatus' });
    history.push(`/post/${postId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSubmitReady()) {
      showUploadFailReason();
      return;
    }

    const S3uploadedURLs = hasImagesToUpload(images)
      ? await uploadImagesToS3(loadError, images, nickname)
      : [];
    const postBody = createPostBody({
      isEditMode,
      initialData,
      images,
      state,
      S3uploadedURLs,
    });
    requestPostUpload(postBody);
  };

  const handleCancel = () => history.goBack();

  //업로드|수정 페이지에서 로그아웃 시, 또는 로그아웃 상태에서 직접 접근시 로그인 모달 띄우기
  useEffect(() => {
    if (loggedIn) return;
    dispatch({ type: 'resetEditStatus' }); //Prompt 컴포넌트 동작을 막기 위해서 초기화.
    openSigninModal();
  }, [loggedIn]);

  return (
    <>
      <Prompt
        when={state.isEdited}
        message={'작성을 취소하고 페이지를 나가시겠어요?'}
      />
      <Header />
      <CommonPost.background className={cx('background')}>
        <CommonPost large className={cx('wrapper')}>
          <ImageUploader images={images} dispatch={imageDispatch} />
          <LocationUploader
            state={state}
            dispatch={dispatch}
            setUploadStatus={setUploadStatus}
          />
          <TitleUploader
            state={state}
            dispatch={dispatch}
            setUploadStatus={setUploadStatus}
          />
          <DescriptionUploader
            state={state}
            dispatch={dispatch}
            setUploadStatus={setUploadStatus}
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
