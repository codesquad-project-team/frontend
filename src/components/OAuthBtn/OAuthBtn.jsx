import React from 'react';
import './OAuthBtn.scss';
import CommonBtn from '../CommonBtn/CommonBtn';

const OAuthBtn = ({ company, imgUrl, msg, href }) => {
  return (
    <a href={href} className="OAuth-btn-link">
      <CommonBtn className="OAuth-btn" styleType="none">
        <img src={imgUrl} />
        {company} 계정으로 {msg}
      </CommonBtn>
    </a>
  );
};

export default OAuthBtn;
