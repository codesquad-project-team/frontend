import React from 'react';
import './OAuthBtn.scss';

const OAuthBtn = ({ company, color, imgUrl, msg }) => {
  return (
    <div className="OAuth-btn" style={{ backgroundColor: color }}>
      <a className="OAuth-btn-company" href="">
        {company} 계정으로 {msg}
      </a>
    </div>
  );
};

export default OAuthBtn;
