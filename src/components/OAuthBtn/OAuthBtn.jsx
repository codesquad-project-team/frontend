import React from 'react';
import './OAuthBtn.scss';

const OAuthBtn = ({ company, imgUrl, msg }) => {
  return (
    <div className="OAuth-btn">
      <img src={imgUrl}></img>
      <a className="OAuth-btn-company" href="">
        {company} 계정으로 {msg}
      </a>
    </div>
  );
};

export default OAuthBtn;
