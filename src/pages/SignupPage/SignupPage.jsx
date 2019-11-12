import React from 'react';
import './SignupPage.scss';
import CommonBtn from '../../components/CommonBtn/CommonBtn';

const SignupPage = () => {
  return (
    <div className="signup-page">
      <header>
        <h1>Connect Flavor</h1>
      </header>
      <div className="signup-page-body">
        <h2>카카오로 회원가입</h2>
        <div className="signup-page-body-auth-checker">인증완료</div>
        <span>닉네임을 만들어주세요</span>
        <div className="signup-page-input-section">
          <input type="text" placeholder="4~15자로 입력해주세요." />
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
