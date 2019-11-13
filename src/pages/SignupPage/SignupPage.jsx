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

  //닉네임 검증
  const [isValidNickname, setIsValidNickname] = useState(null);

  const checkNickname = useCallback(
    debounce(async nickname => {
      const res = await fetch(`${WEB_SERVER_URL}/validate/nickname`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname })
      });
      switch (res.status) {
        case 200:
          console.log('ok');
          break;
        case 400:
          console.log('공백있음');
          break;
        case 409:
          console.log('중복');
          break;
        case 500:
          console.log('server error');
          break;
        default:
          break;
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (nickname) checkNickname(nickname);
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
        </div>
        <CommonBtn className="signup-page-signup-btn">회원가입</CommonBtn>
      </div>
    </div>
  );
};

export default SignupPage;
