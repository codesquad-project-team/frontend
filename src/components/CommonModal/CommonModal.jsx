import React, { useState, useEffect } from 'react';
import './CommonModal.scss';
import OAuthBtn from '../OAuthBtn/OAuthBtn';

const CommonModal = ({ clickHandler, target }) => {
  const [content, setContent] = useState({});

  const makeContent = parent => {
    if (parent === `signin`) {
      setContent({
        title: '시작하기',
        desc:
          '로그인하여 비슷한 취향의 사람을 찾고, 각자의 소중한 시간을 공유하세요.',
        reminderMsg: '아직 계정이 없으신가요?',
        hyperlinkMsg: '가입하기'
      });
    } else {
      setContent({
        title: '가입하기',
        desc:
          '이 곳에서 당신의 취향을 찾으세요.' +
          '\n' +
          '그리고 현재의 감정 상태에 따라 지금 할 일을 정해보세요.',
        reminderMsg: '이미 계정이 있으신가요?',
        hyperlinkMsg: '로그인하기'
      });
    }
  };

  useEffect(() => {
    makeContent(target);
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, []);

  return (
    <>
      <div className="common-modal-overlay" />
      <div className="common-modal">
        <button className="common-modal-btn" onClick={clickHandler}>
          닫기
        </button>
        <div className="common-modal-content">
          <div className="common-modal-header">
            <img src="../../../resources/logo.png"></img>
            <h1>서비스 {content.title}</h1>
          </div>
          <p>{content.desc}</p>
          <div className="common-modal-content-oauth">
            <OAuthBtn
              company="카카오"
              msg={content.title}
              imgUrl="../../../resources/kakao-logo.png"
            ></OAuthBtn>
            <OAuthBtn
              company="페이스북"
              msg={content.title}
              imgUrl="../../../resources/facebook-logo.png"
            ></OAuthBtn>
            <OAuthBtn
              company="인스타그램"
              msg={content.title}
              imgUrl="../../../resources/insta-logo.png"
            ></OAuthBtn>
          </div>
          <p>
            {content.reminderMsg} <a href="">{content.hyperlinkMsg}</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default CommonModal;
