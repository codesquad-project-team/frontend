import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './CommonModal.scss';
import OAuthBtn from '../OAuthBtn/OAuthBtn';
import CommonBtn from '../CommonBtn/CommonBtn';
import useModal from '../../hooks/useModal';
import { IMAGE_BUCKET_URL, WEB_SERVER_URL } from '../../configs';

const cx = classNames.bind(styles);

const CommonModal = ({ onClose, target }) => {
  const { Modal } = useModal();
  const content =
    target === `signin`
      ? {
          title: '시작하기',
          desc:
            '로그인하여 비슷한 취향의 사람을 찾고, 각자의 소중한 시간을 공유하세요.',
          reminderMsg: '아직 계정이 없으신가요?',
          hyperlinkMsg: '가입하기'
        }
      : {
          title: '가입하기',
          desc:
            '이 곳에서 당신의 취향을 찾으세요.' +
            '\n' +
            '그리고 현재의 감정 상태에 따라 지금 할 일을 정해보세요.',
          reminderMsg: '이미 계정이 있으신가요?',
          hyperlinkMsg: '로그인하기'
        };

  return (
    <Modal onClick={onClose}>
      <div className={cx('wrapper')}>
        <button className={cx('close-btn')} onClick={onClose}>
          닫기
        </button>
        <div className={cx('header')}>
          <img src={`${IMAGE_BUCKET_URL}/logo.png`} />
          <h1>서비스 {content.title}</h1>
        </div>
        <p>{content.desc}</p>
        <div className={cx('oauth')}>
          <OAuthBtn
            href={`${WEB_SERVER_URL}/auth/kakao`}
            company="카카오"
            msg={content.title}
            imgUrl={`${IMAGE_BUCKET_URL}/kakao-logo.png`}
          />
          <OAuthBtn
            company="페이스북"
            msg={content.title}
            imgUrl={`${IMAGE_BUCKET_URL}/facebook-logo.png`}
          />
          <OAuthBtn
            company="인스타그램"
            msg={content.title}
            imgUrl={`${IMAGE_BUCKET_URL}/insta-logo.png`}
          />
        </div>
        <p>
          {content.reminderMsg}
          <CommonBtn className={cx('reminder-btn')} styleType="underline">
            <a href={`${WEB_SERVER_URL}/auth/kakao`}>{content.hyperlinkMsg}</a>
          </CommonBtn>
        </p>
      </div>
    </Modal>
  );
};

export default CommonModal;
