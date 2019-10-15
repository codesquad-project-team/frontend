import React from 'react';
import './OAuthBtn.scss';

const OAuthBtn = ({ company, color, imgUrl }) => {
  return (
    <div className="OAuth-btn" style={{ 'background-color': color }}>
      <a className="OAuth-btn-company" href="">
        {company} 계정으로 가입하기
      </a>
    </div>
  );
};

export default OAuthBtn;
