import React, { useState, useEffect } from 'react';
import './SignupPage.scss';
import CommonBtn from '../../components/CommonBtn/CommonBtn';
import useInput from '../../hooks/useInput';
import useFetch from '../../hooks/useFetch';
import { WEB_SERVER_URL } from '../../configs';

const authData = {
  organization: '카카오'
};

const SignupPage = () => {
  const { inputValue, handleChange } = useInput();
  const { nickname } = inputValue;

  // const [authData, setAuthData] = useState(null);
  // const { loading } = useFetch(
  //   `${WEB_SERVER_URL}/auth/api`,
  //   { method: 'POST' },
  //   json => setAuthData(json)
  // );
  const { organization } = authData;
  const postposition = organization === '카카오' ? '로' : '으로';

  return (
    <div className="signup-page">
      <header>
        <h1>Connect Flavor</h1>
      </header>
      <div className="signup-page-body">
        <h2>
          {organization}
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
          <CommonBtn className="signup-page-duplicate-check-btn">
            중복검사
          </CommonBtn>
        </div>
        <CommonBtn className="signup-page-signup-btn">회원가입</CommonBtn>
      </div>
    </div>
  );
};

export default SignupPage;
