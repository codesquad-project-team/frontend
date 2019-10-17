import React, { useState, useEffect } from 'react';
import './CommonModal.scss';
import OAuthBtn from '../OAuthBtn/OAuthBtn';

const CommonModal = ({ clickHandler, target }) => {
  const [content, setContent] = useState({});

  const makeContent = parent => {
    console.log(parent);
    if (parent === `signin`) {
      setContent({
        title: '시작하기',
        desc: '로그인 하는 내용과 관련된 말 블라블라블라',
        reminderMsg: '아직 계정이 없으신가요?',
        hyperlinkMsg: '가입하기'
      });
    } else {
      setContent({
        title: '가입하기',
        desc:
          '이 곳에서 당신의 취향을 찾으세요. 그리고 현재의 감정 상태에 따라 지금 할 일을 정해보세요.',
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
          <h1>서비스 {content.title}</h1>
          <p>{content.desc}</p>
          <div className="common-modal-content-oauth">
            <OAuthBtn
              company="구글"
              color="#DB4437"
              msg={content.title}
              imgUrl=""
            ></OAuthBtn>
            <OAuthBtn
              company="페이스북"
              color="#4267B2"
              msg={content.title}
              imgUrl=""
            ></OAuthBtn>
            <OAuthBtn
              company="인스타그램"
              color="#FCAF45"
              msg={content.title}
              imgUrl=""
            ></OAuthBtn>
          </div>
          <p>
            {content.reminderMsg} <a herf="">{content.hyperlinkMsg}</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default CommonModal;
