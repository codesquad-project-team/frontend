import React, { useState, useEffect, useCallback } from 'react';
import './SignupPage.scss';
import CommonBtn from '../../components/CommonBtn/CommonBtn';
import useInput from '../../hooks/useInput';
import useFetch from '../../hooks/useFetch';
import { debounce } from '../../utils/utils';
import { WEB_SERVER_URL } from '../../configs';

const authData = {
  provider: '카카오'
};

const SignupPage = () => {
  const { inputValue, handleChange } = useInput();
  const { nickname } = inputValue;

  //임시 토큰 검증
  // const [authData, setAuthData] = useState(null);
  // const { loading } = useFetch(
  //   `${WEB_SERVER_URL}/validate/tempToken`,
  //   { method: 'POST', credentials: 'include' },
  //   json => setAuthData(json)
  // );
  const { provider } = authData || { provider: '' };
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
        setReason('사용 가능한 닉네임이에요.');
        break;
      case 400:
        setReason('닉네임에 공백이 있어요.');
        break;
      case 409:
        setReason('중복된 닉네임이에요.');
        break;
      case 500:
        setReason('서버에서 에러가 발생했어요. 잠시후에 다시 시도해주세요.');
        break;
      default:
        break;
    }
  }, []);

  const checkValidNickname = useCallback(
    debounce(nickname => {
      const hasBlank = /\s/.test(nickname);
      const isValid = /^[a-z][a-z0-9_-]{3,14}$/.test(nickname);
      //4~15자 영문 소문자, 숫자, 하이픈, 언더바
      //영문으로 시작, 공백 불가
      if (hasBlank) {
        setReason('닉네임에 공백이 있어요.');
      } else if (isValid) {
        checkNickname(nickname);
      } else {
        setReason('');
      }
    }),
    []
  );

  useEffect(() => {
    if (nickname) {
      checkValidNickname(nickname);
    } else {
      setReason('');
    }
  }, [nickname]);

  return (
    <div className="signup-page">
      <header>
        <h1>Connect Flavor</h1>
      </header>
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
            <span>{reason}</span>
          </div>
        </div>
        <CommonBtn styleType="normal" className="signup-page-signup-btn">
          회원가입
        </CommonBtn>
      </div>
    </div>
  );
};

export default SignupPage;
