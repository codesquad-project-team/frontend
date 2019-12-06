import React, { useRef, useState, useEffect, useCallback } from 'react';
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
import useShakeAnimation from '../../hooks/useShakeAnimation';
import ValidityMessage from '../../components/ValidityMessage/ValidityMessage';

const SignupPage = ({ history }) => {
  const { setLoggedIn } = useLoginContext();
  const { inputValue, handleChange } = useInput();
  const { nickname } = inputValue;

  const { loading, provider } = useTempTokenValidation(history);
  const [nicknameValidity, setNicknameValidity] = useState({});

  const shakeTarget = useRef(null);
  const { setSignupFailed } = useShakeAnimation(shakeTarget);

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

  const signUp = useCallback(async nickname => {
    const res = await fetch(`${WEB_SERVER_URL}/auth/signup`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      //tempToken의 id를 보내기 위해 credentials 옵션 설정
      credentials: 'include',
      body: JSON.stringify({ nickname })
    });
    const json = await res.json();
    const domainRegExp = /^(((http(s?)):\/\/)?)([0-9a-zA-Z-]+(\.|:))([a-z]{2,3}|[0-9]{4})/;
    //사용자가 회원가입 하기 이전에 보고 있던 페이지 url
    const referer = json.referer.replace(domainRegExp, '');
    switch (res.status) {
      case 200:
        setLoggedIn(true);
        history.push(referer);
        break;
      case 400:
        setSignupFailed(true);
        setNicknameValidity('INFO_MESSAGE');
        break;
      case 401:
        setSignupFailed(true);
        setNicknameValidity('INVALID_TOKEN');
        break;
      default:
        break;
    }
  }, []);

  const requestSignup = () => {
    if (nicknameValidity === 'AVAILABLE') {
      signUp(nickname);
    } else {
      setSignupFailed(true);
      setNicknameValidity('INFO_MESSAGE');
    }
  };

  useEffect(() => {
    if (nickname) {
      checkNicknameValidation(nickname);
    } else {
      setNicknameValidity('');
    }
  }, [nickname]);

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
          <div ref={shakeTarget} className={`signup-page-input-section`}>
            <input
              name="nickname"
              value={nickname}
              onChange={handleChange}
              type="text"
              placeholder="4~15자로 입력해주세요."
            />
            <ValidityMessage nicknameValidity={nicknameValidity} />
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
