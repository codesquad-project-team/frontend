import React, { useState, useEffect } from 'react';
import './CommonModal.scss';
import OAuthBtn from '../OAuthBtn/OAuthBtn';

const CommonModal = ({ signUpHandler }) => {
  return (
    <>
      <div className="common-modal-overlay" />
      <div className="common-modal">
        <button className="common-modal-btn" onClick={signUpHandler}>
          닫기
        </button>
        <div className="common-modal-content">
          <h1>서비스 시작하기</h1>
          <p>이 곳에서 당신의 취향을 찾으세요.</p>
          <p>그리고 현재의 감정 상태에 따라 지금 할 일을 정해보세요.</p>
          <div className="common-modal-content-oauth">
            <OAuthBtn company="구글" color="#DB4437" imgUrl=""></OAuthBtn>
            <OAuthBtn company="페이스북" color="#4267B2" imgUrl=""></OAuthBtn>
            <OAuthBtn company="인스타그램" color="#FCAF45" imgUrl=""></OAuthBtn>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonModal;
