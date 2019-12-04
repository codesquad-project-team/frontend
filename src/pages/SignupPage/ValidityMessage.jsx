import React from 'react';
import './ValidityMessage.scss';

const messageMap = {
  AVAILABLE: '사용 가능한 닉네임이에요.',
  HAS_BLANKS: '닉네임에 공백이 있어요.',
  ALREADY_IN_USE: '이미 사용중인 닉네임이에요.',
  CURRENT_NICKNAME: '현재 닉네임이에요.',
  SERVER_ERROR: '서버에서 에러가 발생했어요. 잠시후에 다시 시도해주세요.',
  NO_MESSAGE: '',
  INFO_MESSAGE: '영문으로 시작하는 4~15자의 영문, 숫자 조합을 만들어주세요.',
  INVALID_TOKEN: '유효한 토큰이 아니에요. 메인으로 돌아가서 다시 시도해주세요.',
  INVALID_PHONE_NUMBER: '010-1234-5678 형식으로 입력해주세요.'
};

// TODO : 휴대폰 번호에도 ValidityMessage 사용하고 있음. props받는 key의 이름을 ValidityMessageKey 로 바꾸면 어떨지 상의 후 결정

const ValidityMessage = ({ nicknameValidity, styleObj = {} }) => {
  const valid =
    nicknameValidity === 'AVAILABLE' || nicknameValidity === 'CURRENT_NICKNAME'
      ? true
      : false;

  const message = messageMap[nicknameValidity];

  return (
    <div className="validity-message" style={styleObj}>
      <span
        className={valid ? 'validity-message-ok' : 'validity-message-not-ok'}
      >
        {message}
      </span>
    </div>
  );
};

export default ValidityMessage;
