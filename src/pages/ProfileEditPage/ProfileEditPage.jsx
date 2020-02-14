import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileEditPage.scss';
import Header from '../../components/Header/Header';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import ProfileContentItem from '../../components/ProfileContentItem/ProfileContentItem';
import useInput from '../../hooks/useInput';
import useFetch from '../../hooks/useFetch';
import { WEB_SERVER_URL, MAIN_COLOR } from '../../configs';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
import CommonBtn from '../../components/CommonBtn/CommonBtn';
import ProfileImageChangeBtn from './ProfileImageChangeBtn';
import useScript from '../../hooks/useScript';
import useS3 from '../../hooks/useS3';
import { debounce } from '../../utils/utils';
import { useLoginContext } from '../../contexts/LoginContext';

const cx = classNames.bind(styles);

const ProfileEditPage = () => {
  const { loggedIn, openSigninModal, setNeedsUserInfo } = useLoginContext();
  const { inputValue, setInputValue, handleChange } = useInput();
  const { profileImage, nickname, email, phone, introduction } = inputValue;
  const [image, setImage] = useState({ fileData: [], previewUrl: '' });

  const [currentNickname, setCurrentNickname] = useState('');
  const [nicknameValidity, setNicknameValidity] = useState({});
  const [phoneValidity, setPhoneValidity] = useState('');
  const [initialPageEnter, setInitialPageEnter] = useState(true);

  const { loadError } = useScript(
    'https://sdk.amazonaws.com/js/aws-sdk-2.283.1.min.js'
  );

  const [imageUploadError, setImageUploadError] = useState(false);

  const { S3imageUploadHandler } = useS3();

  const { loading, error } = useFetch(
    `${WEB_SERVER_URL}/user/myinfo`,
    { credentials: 'include' },
    json => initUserInfo(json)
  );

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
      email: email === null ? undefined : email,
      phone: phone === null ? undefined : phone,
      introduction: intro === null ? undefined : intro
    };

    setCurrentNickname(initialValue.nickname);
    setInputValue(initialValue);
  };

  const checkNicknameFromServer = useCallback(async nickname => {
    const res = await fetch(`${WEB_SERVER_URL}/user/checkNicknameDuplication`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname })
    });
    switch (res.status) {
      case 200:
        setNicknameValidity('AVAILABLE');
        break;
      case 400:
        setNicknameValidity('HAS_BLANKS');
        break;
      case 409:
        setNicknameValidity('ALREADY_IN_USE');
        break;
      case 500:
        setNicknameValidity('SERVER_ERROR');
        break;
      default:
        break;
    }
  }, []);

  const checkNicknameValidation = useCallback(
    debounce((nickname, currentNickname) => {
      const isValid = /^[A-Za-z][A-Za-z0-9_-]{3,14}$/.test(nickname);
      const hasBlank = /\s/.test(nickname);
      const onlyOneCharacter = nickname.length === 1;
      const sameNickname = nickname === currentNickname;

      switch (true) {
        case sameNickname:
          setNicknameValidity('CURRENT_NICKNAME');
          break;
        case isValid:
          checkNicknameFromServer(nickname);
          break;
        case hasBlank:
          setNicknameValidity('HAS_BLANKS');
          break;
        case onlyOneCharacter:
          setNicknameValidity('NO_MESSAGE');
          break;
        default:
          setNicknameValidity('INFO_MESSAGE');
          break;
      }
    }),
    []
  );

  const checkPhoneNumberValidation = useCallback(
    debounce(phone => {
      const isValid =
        /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/.test(phone) || !phone; //optional이므로 입력 안해도 허용

      isValid
        ? setPhoneValidity('NO_MESSAGE')
        : setPhoneValidity('INVALID_PHONE_NUMBER');
    }),
    []
  );

  const requestUpdate = e => {
    e.preventDefault();
    if (phoneValidity === 'INVALID_PHONE_NUMBER') {
      return alert('휴대폰 정보를 형식에 맞게 입력해주세요!');
    }
    if (nicknameValidity === 'CURRENT_NICKNAME') return;
    if (nicknameValidity === 'AVAILABLE') {
      handleSubmit();
    } else {
      setNicknameValidity('INFO_MESSAGE');
    }
  };

  const handleSubmit = async () => {
    const hasImageToUpload = image.previewUrl ? true : false;

    const S3UploadedURL = hasImageToUpload ? await uploadImage() : '';

    updateUserInfo(S3UploadedURL);
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
      images: image.fileData,
      setImageUploadError
    });

    return S3UploadedURL;
  };

  const updateUserInfo = async (uploadedUrl = '') => {
    const bodyObj = uploadedUrl
      ? { ...inputValue, profileImage: uploadedUrl }
      : inputValue;

    const res = await fetch(`${WEB_SERVER_URL}/user/profile`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(bodyObj)
    });

    switch (res.status) {
      case 200:
        setCurrentNickname(nickname);
        setNicknameValidity('CURRENT_NICKNAME');
        setNeedsUserInfo(state => !state);
        alert('회원 정보가 수정 되었습니다!');
        break;
      case 400:
        alert('요청이 올바르지 않습니다.');
        break;
      case 401:
        alert('인증되지 않은 토큰입니다.');
        break;
      default:
        //do nothing
        break;
    }
  };

  useEffect(() => {
    if (nickname) {
      checkNicknameValidation(nickname, currentNickname);
    } else {
      setNicknameValidity('');
    }
  }, [nickname]);

  useEffect(() => {
    checkPhoneNumberValidation(phone);
  }, [phone]);

  useEffect(() => {
    !loggedIn && openSigninModal();
  }, [loggedIn]);

  const imageSrc = initialPageEnter ? profileImage : image.previewUrl;

  return (
    <>
      <Header />
      <div className={cx('dimmed-background')}>
        <div className={cx('wrapper')}>
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
                <ProfileImage large src={imageSrc} />
                <ProfileImageChangeBtn
                  setImage={setImage}
                  setInitialPageEnter={setInitialPageEnter}
                />
              </div>
              <ProfileContentItem
                label="닉네임"
                value={nickname}
                name="nickname"
                changeHandler={handleChange}
                nicknameValidity={nicknameValidity}
              />
              <ProfileContentItem
                label="소개"
                value={introduction}
                name="introduction"
                changeHandler={handleChange}
              />
              <ProfileContentItem
                label="이메일"
                value={email}
                name="email"
                changeHandler={handleChange}
              />
              <ProfileContentItem
                label="휴대폰 번호"
                value={phone}
                name="phone"
                changeHandler={handleChange}
                nicknameValidity={phoneValidity}
              />
              <CommonBtn
                className={cx('submit-btn')}
                type="submit"
                styleType="emphasize"
                onClick={requestUpdate}
              >
                제출
              </CommonBtn>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileEditPage;

const override = css`
  display: block;
  margin: 17rem auto;
`;
