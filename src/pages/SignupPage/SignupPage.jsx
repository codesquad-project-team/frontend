import React, { useMemo, useState, useEffect, useCallback } from 'react';
import './SignupPage.scss';
import CommonBtn from '../../components/CommonBtn/CommonBtn';
import CommonLink from '../../components/CommonLink/CommonLink';
import useInput from '../../hooks/useInput';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
import { debounce } from '../../utils/utils';
import { WEB_SERVER_URL, MAIN_COLOR } from '../../configs';
import { useLoginContext } from '../../contexts/LoginContext';
import useTempTokenValidation from '../../hooks/useTempTokenValidation';

const ANIMATION_DELAY = 300;
const NICKNAME_AVAILABLE = {
  valid: true,
  message: '사용 가능한 닉네임이에요.'
};
const NICKNAME_HAS_BLANKS = {
  valid: false,
  message: '닉네임에 공백이 있어요.'
};
const NICKNAME_ALREADY_IN_USE = {
  valid: false,
  message: '이미 사용중인 닉네임이에요.'
};
const SERVER_ERROR = {
  valid: false,
  message: '서버에서 에러가 발생했어요. 잠시후에 다시 시도해주세요.'
};
const NO_MESSAGE = { valid: false, message: '' };
const INFO_MESSAGE = {
  valid: false,
  message: '영문으로 시작하는 4~15자의 영문, 숫자 조합을 만들어주세요.'
};
const INVALID_TOKEN = {
  valid: false,
  message: '유효한 토큰이 아니에요. 메인으로 돌아가서 다시 시도해주세요.'
};

const SignupPage = ({ history }) => {
  const { setLoggedIn } = useLoginContext();
  const { inputValue, handleChange } = useInput();
  const { nickname } = inputValue;

  const [nicknameValidity, setNicknameValidity] = useState({});
  const [signupFailed, setSignupFailed] = useState(false);

  const { loading, provider } = useTempTokenValidation(history);

  const checkNicknameFromServer = useCallback(async nickname => {
    const res = await fetch(`${WEB_SERVER_URL}/validate/nickname`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname })
    });
    switch (res.status) {
      case 200:
        setNicknameValidity(NICKNAME_AVAILABLE);
        break;
      case 400:
        setNicknameValidity(NICKNAME_HAS_BLANKS);
        break;
      case 409:
        setNicknameValidity(NICKNAME_ALREADY_IN_USE);
        break;
      case 500:
        setNicknameValidity(SERVER_ERROR);
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
          setNicknameValidity(NICKNAME_HAS_BLANKS);
          break;
        case onlyOneCharacter:
          setNicknameValidity(NO_MESSAGE);
          break;
        default:
          setNicknameValidity(INFO_MESSAGE);
          break;
      }
    }),
    []
  );

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
    const json = await res.json();
    const domainRegExp = /^(((http(s?)):\/\/)?)([0-9a-zA-Z-]+(\.|:))([a-z]{2,3}|[0-9]{4})/;
    const referer = json.referer.replace(domainRegExp, '');
    switch (res.status) {
      case 200:
        setLoggedIn(true);
        history.push(referer);
        break;
      case 400:
        setSignupFailed(true);
        setNicknameValidity(INFO_MESSAGE);
        break;
      case 401:
        setSignupFailed(true);
        setNicknameValidity(INVALID_TOKEN);
        break;
      default:
        break;
    }
  }, []);

  const requestSignup = () => {
    if (nicknameValidity.valid) {
      signUp(nickname);
    } else {
      setSignupFailed(true);
      setNicknameValidity(INFO_MESSAGE);
    }
  };

  useEffect(() => {
    if (nickname) {
      checkNicknameValidation(nickname);
    } else {
      setNicknameValidity({});
    }
  }, [nickname]);

  useEffect(() => {
    if (signupFailed) {
      setTimeout(() => {
        setSignupFailed(false);
      }, ANIMATION_DELAY);
    }
  }, [signupFailed]);

  return (
    <div className="signup-page">
      <header>
        <CommonLink to="/">
          <h1>Connect Flavor</h1>
        </CommonLink>
      </header>
      {!loading && (
        <div className="signup-page-body">
          <h2>{provider} 회원가입</h2>
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
            onClick={requestSignup}
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
