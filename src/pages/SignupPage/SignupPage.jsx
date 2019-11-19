import React, { useState, useEffect, useCallback } from 'react';
import './SignupPage.scss';
import CommonBtn from '../../components/CommonBtn/CommonBtn';
import CommonLink from '../../components/CommonLink/CommonLink';
import useInput from '../../hooks/useInput';
import useFetch from '../../hooks/useFetch';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
import { debounce } from '../../utils/utils';
import { WEB_SERVER_URL, MAIN_COLOR } from '../../configs';

const ANIMATION_DELAY = 300;

const SignupPage = () => {
  const { inputValue, handleChange } = useInput();
  const { nickname } = inputValue;

  const [authData, setAuthData] = useState({});
  const { loading } = useFetch(
    `${WEB_SERVER_URL}/validate/tempToken`,
    { method: 'POST', credentials: 'include' },
    json => setAuthData(json)
  );

  const { provider } = authData;
  const postposition = provider === 'kakao' ? '로' : '으로';

  const [nicknameValidity, setNicknameValidity] = useState(null);

  const checkNicknameFromServer = useCallback(async nickname => {
    const res = await fetch(`${WEB_SERVER_URL}/validate/nickname`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname })
    });
    switch (res.status) {
      case 200:
        setNicknameValidity({
          valid: true,
          message: '사용 가능한 닉네임이에요.'
        });
        break;
      case 400:
        setNicknameValidity({
          valid: false,
          message: '닉네임에 공백이 있어요.'
        });
        break;
      case 409:
        setNicknameValidity({
          valid: false,
          message: '이미 사용중인 닉네임이에요.'
        });
        break;
      case 500:
        setNicknameValidity({
          valid: false,
          message: '서버에서 에러가 발생했어요. 잠시후에 다시 시도해주세요.'
        });
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
      switch (true) {
        case isValid:
          checkNicknameFromServer(nickname);
          break;
        case hasBlank:
          setNicknameValidity({
            valid: false,
            message: '닉네임에 공백이 있어요.'
          });
          break;
        case onlyOneCharacter:
          setNicknameValidity({ valid: false, message: '' });
          break;
        default:
          setNicknameValidity({
            valid: false,
            message:
              '영문으로 시작하는 4~15자의 영문, 숫자 조합을 만들어주세요.'
          });
          break;
      }
    }),
    []
  );

  useEffect(() => {
    if (nickname) {
      checkNicknameValidation(nickname);
    } else {
      setNicknameValidity(null);
    }
  }, [nickname]);

  const [signupFailed, setSignupFailed] = useState(false);

  const signUp = useCallback(async nickname => {
    const res = await fetch(`${WEB_SERVER_URL}/auth/signup`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ nickname })
    });
    switch (res.status) {
      case 400:
        setSignupFailed(true);
        setNicknameValidity({
          valid: false,
          message: '제출된 닉네임이 없어요.'
        });
        break;
      case 401:
        setSignupFailed(true);
        setNicknameValidity({
          valid: false,
          message:
            '토큰이 유효하지 않아요. 메인으로 돌아가서 다시 시도해주세요.'
        });
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    if (signupFailed) {
      setTimeout(() => {
        setSignupFailed(false);
      }, ANIMATION_DELAY);
    }
  }, [signupFailed]);

  const handleSubmit = () => {
    if (nicknameValidity.valid) {
      signUp(nickname);
    } else {
      setSignupFailed(true);
    }
  };

  return (
    <div className="signup-page">
      <header>
        <CommonLink to="/">
          <h1>Connect Flavor</h1>
        </CommonLink>
      </header>
      {!loading && (
        <div className="signup-page-body">
          <h2>
            {provider}
            {postposition} 회원가입
          </h2>
          <div className="signup-page-auth-checker">인증완료</div>
          <span>닉네임을 만들어주세요</span>
          <div
            className={`signup-page-input-section ${signupFailed &&
              'signup-page-input-section-failed'}`}
          >
            <input
              name="nickname"
              value={nickname}
              onChange={handleChange}
              type="text"
              placeholder="4~15자로 입력해주세요."
            />
            <div>
              {nicknameValidity && (
                <span
                  className={
                    nicknameValidity.valid
                      ? 'signup-page-reason-ok'
                      : 'signup-page-reason'
                  }
                >
                  {nicknameValidity.message}
                </span>
              )}
            </div>
          </div>
          <CommonBtn
            styleType="emphasize"
            className="signup-page-signup-btn"
            onClick={handleSubmit}
          >
            회원가입
          </CommonBtn>
        </div>
      )}
      <FadeLoader
        css={override}
        sizeUnit={'px'}
        size={150}
        color={MAIN_COLOR}
        loading={loading}
      />
    </div>
  );
};

export default SignupPage;

const override = css`
  display: block;
  margin: 17rem auto;
`;
