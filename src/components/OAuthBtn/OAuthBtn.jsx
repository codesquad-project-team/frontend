import React from 'react';
import './OAuthBtn.scss';
import { WEB_SERVER_URL } from '../../configs';

const OAuthBtn = ({ company, imgUrl, msg }) => {
  return (
    <div className="OAuth-btn">
      <img src={imgUrl} />
      <a className="OAuth-btn-text" href={`${WEB_SERVER_URL}/auth/kakao`}>
        {company} 계정으로 {msg}
      </a>
    </div>
  );
};

export default OAuthBtn;
