import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import FadeLoader from 'react-spinners/FadeLoader';
import { css } from '@emotion/core';
import CommonBtn from '../../components/CommonBtn/CommonBtn';
import CommonLink from '../../components/CommonLink/CommonLink';
import ValidityMessage from '../../components/ValidityMessage/ValidityMessage';
import { useLoginContext } from '../../contexts/LoginContext';
import useTempTokenValidation from '../../hooks/useTempTokenValidation';
import useProfileValidation from '../../hooks/useProfileValidation';
import useShakeAnimation from '../../hooks/useShakeAnimation';
import useDebounce from '../../hooks/useDebounce';
import useFetch from '../../hooks/useFetch';
import useInput from '../../hooks/useInput';
import { MAIN_COLOR } from '../../configs';
import api from '../../api';
import styles from './SignupPage.scss';

const cx = classNames.bind(styles);

const SignupPage = () => {
  const history = useHistory();
  const { setLoggedIn, setNeedsUserInfo } = useLoginContext();
  const { inputValue, handleChange } = useInput();
  const { nickname } = inputValue;

  const { loading, provider } = useTempTokenValidation();

  const shakeTarget = useRef(null);
  const [shakeInput] = useShakeAnimation(shakeTarget);

  const {
    validities,
    isAllValid,
    resetValidation,
    setInvalidToken,
    setNicknameAvailable,
    setNicknameAlreadyInUse,
    setNicknameHasBlanks,
    setValidationServerError,
    showNicknameInfoMessage
  } = useProfileValidation({
    nickname: { isValid: false, message: '' }
  });

  const { request: checkNicknameFromServer } = useFetch({
    onRequest: api.checkNickname,
    onSuccess: setNicknameAvailable,
    onError: {
      400: setNicknameHasBlanks,
      409: setNicknameAlreadyInUse,
      500: setValidationServerError
    }
  });

  const checkNicknameValidation = useDebounce(nickname => {
    if (!nickname) return resetValidation();

    const isValid = /^[A-Za-z][A-Za-z0-9_-]{3,14}$/.test(nickname);
    const hasBlank = /\s/.test(nickname);

    switch (true) {
      case isValid:
        checkNicknameFromServer(nickname);
        break;
      case hasBlank:
        setNicknameHasBlanks();
        break;
      default:
        showNicknameInfoMessage();
        return;
    }
  });

  const DOMAIN_REGEXP = /^(((http(s?)):\/\/)?)([0-9a-zA-Z-]+(\.|:))([a-z]{2,3}|[0-9]{4})/;

  const { request: signup } = useFetch({
    onRequest: api.signup,
    onSuccess: ({ referer }) => goTo(referer.replace(DOMAIN_REGEXP, '')),
    onError: {
      400: () => {
        shakeInput();
        showNicknameInfoMessage();
      },
      401: () => {
        shakeInput();
        setInvalidToken();
      }
    }
  });
  const goTo = prevPath => {
    setLoggedIn(true);
    setNeedsUserInfo(state => !state);
    history.push(prevPath);
  };

  const requestSignup = () => {
    if (isAllValid()) {
      signup(nickname);
    } else {
      shakeInput();
      showNicknameInfoMessage();
    }
  };

  useEffect(() => {
    checkNicknameValidation(nickname);
  }, [nickname]);

  return (
    <div className={cx('wrapper')}>
      <header>
        <CommonLink to="/">
          <h1>Connect Flavor</h1>
        </CommonLink>
      </header>
      {!loading && (
        <div className={cx('main')}>
          <h2>{provider} 회원가입</h2>
          <span>닉네임을 만들어주세요</span>
          <div ref={shakeTarget} className={cx('input-section')}>
            <input
              name="nickname"
              value={nickname}
              onChange={handleChange}
              type="text"
              placeholder="4~15자로 입력해주세요."
            />
            <ValidityMessage messageKey={validities.nickname.message} />
          </div>
          <CommonBtn
            styleType="emphasize"
            className={cx('signup-btn')}
            onClick={requestSignup}
          >
            회원가입
          </CommonBtn>
        </div>
      )}
      <FadeLoader
        css={override}
        sizeUnit={'px'}
        size={150}
        color={MAIN_COLOR}
        loading={loading}
      />
    </div>
  );
};

export default SignupPage;

const override = css`
  display: block;
  margin: 17rem auto;
`;
