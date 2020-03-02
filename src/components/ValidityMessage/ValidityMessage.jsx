import React from 'react';
import classNames from 'classnames/bind';
import styles from './ValidityMessage.scss';
import useMediaQuerySet from '../../hooks/useMediaQuerySet';

const cx = classNames.bind(styles);

const messageMap = {
  AVAILABLE: '사용 가능한 닉네임이에요.',
  HAS_BLANKS: '닉네임에 공백이 있어요.',
  ALREADY_IN_USE: '이미 사용중인 닉네임이에요.',
  IS_PREVIOUS_NICKNAME: '현재 닉네임이에요.',
  SERVER_ERROR: '서버에서 에러가 발생했어요. 잠시후에 다시 시도해주세요.',
  NO_MESSAGE: '',
  INFO_MESSAGE:
    '영문으로 시작하는 4~15자의 영문,<br/> 숫자 조합을 만들어주세요.',
  INVALID_TOKEN: '유효한 토큰이 아니에요. 메인으로 돌아가서 다시 시도해주세요.',
  INVALID_PHONE_NUMBER: '010-1234-5678 형식으로<br/> 입력해주세요.'
};

const makeMessageLineByLine = (messageKey, isMobile) =>
  messageKey &&
  messageMap[messageKey].split('<br/>').map((line, idx) => (
    <span key={idx}>
      {line}
      {isMobile ? <br /> : ''}
    </span>
  ));

const ValidityMessage = ({ messageKey, styleObj = {} }) => {
  const { isMobile } = useMediaQuerySet();
  const valid =
    messageKey === 'AVAILABLE' || messageKey === 'IS_PREVIOUS_NICKNAME';

  const message = makeMessageLineByLine(messageKey, isMobile);

  return (
    <div className={cx('wrapper')} style={styleObj}>
      <span className={cx(valid ? 'ok-msg' : 'not-ok-msg')}>{message}</span>
    </div>
  );
};

export default ValidityMessage;
