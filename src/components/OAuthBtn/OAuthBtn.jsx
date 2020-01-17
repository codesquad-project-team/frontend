import React from 'react';
import classNames from 'classnames/bind';
import styles from './OAuthBtn.scss';
import CommonBtn from '../CommonBtn/CommonBtn';

const cx = classNames.bind(styles);

const OAuthBtn = ({ company, imgUrl, msg, href }) => {
  return (
    <a href={href} className={cx('link')}>
      <CommonBtn className={cx('btn')} styleType="none">
        <img src={imgUrl} />
        {company} 계정으로 {msg}
      </CommonBtn>
    </a>
  );
};

export default OAuthBtn;
