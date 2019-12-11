import React, { useState, useEffect, useCallback, useRef } from 'react';
import './ProfileEditPage.scss';
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
import ValidityMessage from '../../components/ValidityMessage/ValidityMessage';
import { debounce } from '../../utils/utils';

const ProfileEditPage = () => {
  const { inputValue, setInputValue, handleChange, restore } = useInput();
  const { profile_image, nickname, email, phone, description } = inputValue;

  const [image, setImage] = useState({ fileType: [], previewUrl: '' });

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
      description: desc
    } = userInfo;

    const initialValue = {
      profile_image: profileImage === null ? undefined : profileImage,
      nickname,
      email: email === null ? undefined : email,
      phone: phone === null ? undefined : phone,
      description: desc === null ? undefined : Buffer.from(desc).toString()
    };

    setCurrentNickname(initialValue.nickname);
    setInputValue(initialValue);
  };

  const checkNicknameFromServer = useCallback(async nickname => {
    const res = await fetch(`${WEB_SERVER_URL}/validate/nickname`, {
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
    debounce(nickname => {
      const isValid = /^[A-Za-z][A-Za-z0-9_-]{3,14}$/.test(nickname);
      const hasBlank = /\s/.test(nickname);
      const onlyOneCharacter = nickname.length === 1;
      const sameNickname = nickname === currentNickname;
      switch (true) {
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
      const isValid = /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/.test(phone);

      isValid
        ? setPhoneValidity('NO_MESSAGE')
        : setPhoneValidity('INVALID_PHONE_NUMBER');
    }),
    []
  );

  const updateUserInfo = async () => {
    const res = await fetch(`${WEB_SERVER_URL}/user/profile`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(inputValue)
    });

    switch (res.status) {
      case 200:
        alert('회원 정보가 수정 되었습니다!');
        break;

      case 400:
        alert('요청이 올바르지 않습니다.');
        break;

      case 401:
        alert('인증되지 않은 토큰입니다.');
        break;

      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (image.previewUrl) {
      if (loadError) {
        return alert(
          `필요한 스크립트를 로드하지 못했습니다. 다음에 다시 시도해주세요.`
        );
      }

      const albumName = nickname;
      const albumNamePrefix = 'profile-images/';

      S3imageUploadHandler(
        albumName,
        albumNamePrefix,
        image.fileType,
        setImageUploadError
      ).then(result => {
        setInputValue({ ...inputValue, ['profile_image']: result[0] });
      });
    }

    updateUserInfo();
  };

  useEffect(() => {
    if (nickname) {
      nickname === currentNickname
        ? setNicknameValidity('CURRENT_NICKNAME')
        : checkNicknameValidation(nickname);
    } else {
      setNicknameValidity('');
    }
  }, [nickname]);

  useEffect(() => {
    checkPhoneNumberValidation(phone);
  }, [phone]);

  const imageSrc = initialPageEnter ? profile_image : image.previewUrl;

  return (
    <>
      <Header />
      <div className="profile-edit-page-dimmed-background">
        <div className="profile-edit-page">
          <div className="profile-edit-page-nav">
            <div className="profile-edit-page-nav-item">프로필 편집</div>
          </div>
          <FadeLoader
            css={override}
            sizeUnit={'px'}
            size={150}
            color={MAIN_COLOR}
            loading={loading}
          />
          {!loading && (
            <form className="profile-edit-page-content-form">
              <div className="profile-edit-page-content-item profile-image-section">
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
                value={description}
                name="description"
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
                className="profile-edit-page-submit-btn"
                type="submit"
                styleType="emphasize"
                onClick={handleSubmit}
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
