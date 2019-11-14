import React, { useState, useEffect, useCallback } from 'react';
import './SignupPage.scss';
import CommonBtn from '../../components/CommonBtn/CommonBtn';
import useInput from '../../hooks/useInput';
import useFetch from '../../hooks/useFetch';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';
import { debounce } from '../../utils/utils';
import { WEB_SERVER_URL, MAIN_COLOR } from '../../configs';

const SignupPage = () => {
  const { inputValue, handleChange } = useInput();
  const { nickname } = inputValue;

  //임시 토큰 검증
  const [authData, setAuthData] = useState(null);
  const { loading } = useFetch(
    `${WEB_SERVER_URL}/validate/tempToken`,
    { method: 'POST', credentials: 'include' },
    json => setAuthData(json)
  );

  const { provider } = authData || { provider: '(테스트)' }; //TODO: 토큰검증 기능 안정되면 제거
  const postposition = provider === '카카오' ? '로' : '으로';

  const [reason, setReason] = useState(null);

  const checkNickname = useCallback(async nickname => {
    const res = await fetch(`${WEB_SERVER_URL}/validate/nickname`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname })
    });
    switch (res.status) {
      case 200:
        setReason({ valid: true, message: '사용 가능한 닉네임이에요.' });
        break;
      case 400:
        setReason({ valid: false, message: '닉네임에 공백이 있어요.' });
        break;
      case 409:
        setReason({ valid: false, message: '이미 사용중인 닉네임이에요.' });
        break;
      case 500:
        setReason({
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
      const hasBlank = /\s/.test(nickname);
      const isValid = /^[a-z][a-z0-9_-]{3,14}$/.test(nickname);
      //4~15자 영문 소문자, 숫자, 하이픈, 언더바
      //영문으로 시작, 공백 불가
      if (isValid) {
        checkNickname(nickname);
      } else if (hasBlank) {
        setReason({ valid: false, message: '닉네임에 공백이 있어요.' });
      } else if (nickname.length === 1) {
        setReason({ valid: false, message: '' });
      } else {
        setReason({
          valid: false,
          message: '영문으로 시작하는 4~15자의 영문, 숫자 조합을 만들어주세요.'
        });
      }
    }),
    []
  );

  useEffect(() => {
    if (nickname) {
      checkNicknameValidation(nickname);
    } else {
      setReason(null);
    }
  }, [nickname]);

  return (
    <div className="signup-page">
      <header>
        <h1>Connect Flavor</h1>
      </header>
      {!loading && (
        <div className="signup-page-body">
          <h2>
            {provider}
            {postposition} 회원가입
          </h2>
          <div className="signup-page-auth-checker">인증완료</div>
          <span>닉네임을 만들어주세요</span>
          <div className="signup-page-input-section">
            <input
              name="nickname"
              value={nickname}
              onChange={handleChange}
              type="text"
              placeholder="4~15자로 입력해주세요."
            />
            <div>
              {reason && (
                <span
                  className={
                    reason.valid
                      ? 'signup-page-reason-ok'
                      : 'signup-page-reason'
                  }
                >
                  {reason.message}
                </span>
              )}
            </div>
          </div>
          <CommonBtn styleType="normal" className="signup-page-signup-btn">
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
