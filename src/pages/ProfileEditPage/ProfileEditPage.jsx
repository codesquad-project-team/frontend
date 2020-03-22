import React, { useState, useEffect, useCallback, useRef } from 'react';
import classNames from 'classnames/bind';
import FadeLoader from 'react-spinners/FadeLoader';
import { css } from '@emotion/core';
import CommonPost from '../../components/CommonPost/CommonPost';
import CommonBtn from '../../components/CommonBtn/CommonBtn';
import IconButton from '../../components/CommonBtn/IconButton';
import Header from '../../components/Header/Header';
import ImageEditor from '../../components/ImageEditor';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import ProfileContentItem from '../../components/ProfileContentItem/ProfileContentItem';
import useProfileValidation from '../../hooks/useProfileValidation';
import useEditStatus from '../../hooks/useEditStatus';
import useShakeAnimation from '../../hooks/useShakeAnimation';
import useAsyncDispatch from '../../hooks/useAsyncDispatch';
import useInput from '../../hooks/useInput';
import useFetch from '../../hooks/useFetch';
import useScript from '../../hooks/useScript';
import useModal from '../../hooks/useModal';
import useS3 from '../../hooks/useS3';
import { debounce } from '../../utils/utils';
import { useLoginContext } from '../../contexts/LoginContext';
import { MAIN_COLOR, IMAGE_BUCKET_URL } from '../../configs';
import action from './action';
import reducer from './reducer';
import api from '../../api';
import styles from './ProfileEditPage.scss';

const cx = classNames.bind(styles);

const ProfileEditPage = () => {
  const { Modal, isOpen, toggleModal } = useModal();
  const { loggedIn, openSigninModal, setNeedsUserInfo } = useLoginContext();

  const nicknameForm = useRef();
  const emailForm = useRef();
  const phoneForm = useRef();
  const [shakeNickname] = useShakeAnimation(nicknameForm);
  const [shakeEmail] = useShakeAnimation(emailForm);
  const [shakePhone] = useShakeAnimation(phoneForm);

  const { inputValue, setInputValue, handleChange } = useInput();
  const { profileImage, nickname, email, phone, introduction } = inputValue;

  const initialImage = {
    original: null,
    originalURL: '',
    forUpload: [],
    previewURL: '',
    cropperData: {}
  };
  const [image, dispatch, asyncDispatch] = useAsyncDispatch(
    reducer,
    initialImage,
    action
  );

  const [initialUserInfo, saveInitialUserInfo] = useState();

  const { loadError } = useScript(
    'https://sdk.amazonaws.com/js/aws-sdk-2.283.1.min.js'
  );

  const [imageUploadError, setImageUploadError] = useState(false);

  const { S3imageUploadHandler } = useS3();

  const { loading } = useFetch({
    onRequest: api.getMyProfile,
    onSuccess: json => initUserInfo(json),
    autoFetch: true,
    loadStatus: true
  });

  const initUserInfo = userInfo => {
    const {
      profileImage,
      nickname,
      email,
      phone,
      introduction: intro
    } = userInfo;

    // 리액트에서 input 태그의 비어있는 값을 null로 표현하기 보다는 undefined 으로 사용하는 것을 권고함
    const initialValue = {
      profileImage: profileImage === null ? undefined : profileImage,
      nickname,
      email: email === null ? '' : email,
      phone: phone === null ? '' : phone,
      introduction: intro === null ? '' : intro //input을 다 지우면 빈문자열('')임. 따라서 수정 여부 비교를 위해서는 초기값이 빈문자열이어야함.
    };

    saveInitialUserInfo(initialValue);
    setInputValue(initialValue); //TODO: setInitialValues 같은 이름으로 수정하는건 어떨까?
  };

  const {
    setEditStatus,
    changeEditStatus,
    isEdited,
    getEditedProperties
  } = useEditStatus(initialUserInfo);

  const {
    validities,
    isAllValid,
    getInvalidProperties,
    setValid,
    setInvalid,
    setNicknameAlreadyInUse,
    setNicknameAvailable,
    setNicknameHasBlanks,
    setValidationServerError,
    setIsPreviousNickname,
    showNicknameInfoMessage
  } = useProfileValidation();

  const checkNicknameValidation = debounce((nickname, currentNickname) => {
    const isValid = /^[A-Za-z][A-Za-z0-9_-]{3,14}$/.test(nickname);
    const hasBlank = /\s/.test(nickname);
    const sameNickname = nickname === currentNickname;

    switch (true) {
      case sameNickname:
        setIsPreviousNickname();
        break;
      case isValid:
        checkNicknameOnServer(nickname);
        break;
      case hasBlank:
        setNicknameHasBlanks();
        break;
      default:
        showNicknameInfoMessage();
        break;
    }
  });
  const { request: checkNicknameOnServer } = useFetch({
    onRequest: api.checkNickname,
    onSuccess: setNicknameAvailable,
    onError: {
      400: setNicknameHasBlanks,
      409: setNicknameAlreadyInUse,
      500: setValidationServerError
    }
  });

  const checkPhoneNumberValidation = useCallback(
    debounce(phone => {
      const isValid =
        /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/.test(phone) || !phone; //optional이므로 입력 안해도 허용

      isValid ? setValid('phone') : setInvalid('phone');
    }),
    []
  );

  const checkEmailValidation = debounce(email => {
    const regExp = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/;

    regExp.test(email) || !email ? setValid('email') : setInvalid('email');
  });

  const handleSubmit = e => {
    e.preventDefault();
    isEdited() && isAllValid(validities) ? requestUpdate() : showErrorEffect();
  };

  const requestUpdate = async () => {
    const editedProperties = getEditedProperties();
    const updatedValues = filterUpdatedValue(editedProperties, inputValue);

    const hasImageToUpload = image.previewURL ? true : false;
    const S3UploadedURL = hasImageToUpload && (await uploadImage());

    const userInfo = S3UploadedURL
      ? { ...updatedValues, profileImage: S3UploadedURL }
      : updatedValues;

    requestUpdateUserInfo(userInfo);
  };

  const filterUpdatedValue = (editedProperties, inputValue) => {
    return editedProperties.reduce(
      (acc, property) => ({ ...acc, [property]: inputValue[property] }),
      {}
    );
  };

  const uploadImage = async () => {
    if (loadError) {
      return alert(
        `필요한 스크립트를 로드하지 못했습니다. 다음에 다시 시도해주세요.`
      );
    }
    // await : promise의 resolve Value를 리턴
    const [S3UploadedURL] = await S3imageUploadHandler({
      albumName: nickname,
      albumNamePrefix: 'profile-images/',
      images: image.forUpload,
      setImageUploadError
    });

    return S3UploadedURL;
  };

  const { request: requestUpdateUserInfo } = useFetch({
    onRequest: userInfo => api.updateProfile(userInfo),
    onSuccess: () => handleUpdateSuccess(),
    onError: {
      400: '요청이 올바르지 않습니다.',
      401: '인증되지 않은 토큰입니다.'
    }
  });

  const handleUpdateSuccess = () => {
    saveInitialUserInfo({
      ...inputValue,
      profileImage: image.previewURL || profileImage
    });
    setIsPreviousNickname();
    setNeedsUserInfo(state => !state);
    alert('회원 정보가 수정 되었습니다!');
  };

  const showErrorEffect = () => {
    const shakeMap = {
      nickname: shakeNickname,
      email: shakeEmail,
      phone: shakePhone
    };
    const invalidProperties = getInvalidProperties();
    invalidProperties.forEach(property => shakeMap[property]());
  };

  const handleProfileImage = ({ target }) => {
    const file = Array.from(target.files)[0];
    if (!file) return;

    asyncDispatch({ type: 'addNewImage', payload: file });
    setEditStatus({ profileImage: { isEdited: true } });
  };

  const handleImageEdit = dispatch => action => {
    dispatch(action);
    setEditStatus({ profileImage: { isEdited: true } });
  };

  const bindHandleChange = property => e => {
    changeEditStatus(initialUserInfo, property, e);
    handleChange(e);
  };

  useEffect(() => {
    if (!initialUserInfo) return;
    checkNicknameValidation(nickname, initialUserInfo.nickname);
  }, [nickname]);

  useEffect(() => {
    checkPhoneNumberValidation(phone);
  }, [phone]);

  useEffect(() => {
    checkEmailValidation(email);
  }, [email]);

  useEffect(() => {
    !loggedIn && openSigninModal();
  }, [loggedIn]);

  return (
    <>
      <Header />
      <CommonPost.background className={cx('background')}>
        <CommonPost className={cx('wrapper')}>
          <div className={cx('nav')}>
            <div className={cx('nav-item')}>프로필 편집</div>
          </div>
          <FadeLoader
            css={override}
            sizeUnit={'px'}
            size={150}
            color={MAIN_COLOR}
            loading={loading}
          />
          {!loading && (
            <form className={cx('content-form')}>
              <div className={cx('profile-image-section')}>
                <ProfileImage
                  large
                  src={image.previewURL || profileImage}
                  className={cx('profile-image')}
                />
                <div className={cx('edit-btns')}>
                  <IconButton
                    type="addImage"
                    src={`${IMAGE_BUCKET_URL}/profile-change-icon.png`}
                    onChange={handleProfileImage}
                  >
                    프로필 사진 바꾸기
                  </IconButton>
                  {image.previewURL && (
                    <IconButton
                      src={`${IMAGE_BUCKET_URL}/edit-icon1.png`}
                      onClick={toggleModal}
                    >
                      사진 편집
                    </IconButton>
                  )}
                </div>
              </div>
              <ProfileContentItem
                forwardedRef={nicknameForm}
                label="닉네임"
                value={nickname}
                name="nickname"
                changeHandler={bindHandleChange('nickname')}
                messageKey={validities.nickname.message}
              />
              <ProfileContentItem
                label="소개"
                value={introduction}
                name="introduction"
                changeHandler={bindHandleChange('introduction')}
              />
              <ProfileContentItem
                forwardedRef={emailForm}
                label="이메일"
                value={email}
                name="email"
                changeHandler={bindHandleChange('email')}
                messageKey={validities.email.message}
              />
              <ProfileContentItem
                forwardedRef={phoneForm}
                label="휴대폰 번호"
                value={phone}
                name="phone"
                changeHandler={bindHandleChange('phone')}
                messageKey={validities.phone.message}
              />
              <CommonBtn
                className={cx('submit-btn')}
                type="submit"
                styleType="emphasize"
                onClick={handleSubmit}
              >
                제출
              </CommonBtn>
            </form>
          )}
          {isOpen && (
            <ImageEditor
              Modal={Modal}
              asyncDispatch={handleImageEdit(asyncDispatch)}
              src={image.originalURL}
              originalFile={image.original}
              cropperData={image.cropperData}
              onClose={toggleModal}
            />
          )}
        </CommonPost>
      </CommonPost.background>
    </>
  );
};

export default ProfileEditPage;

const override = css`
  display: block;
  margin: 17rem auto;
`;
