import React from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileContentItem.scss';
import ValidityMessage from '../ValidityMessage/ValidityMessage';

const cx = classNames.bind(styles);

const ProfileContentItem = props => {
  const { label, name, value, changeHandler, nicknameValidity = '' } = props;

  return (
    <div className={cx('content-item')}>
      <label>{label}</label>
      <input type="text" name={name} value={value} onChange={changeHandler} />
      {nicknameValidity && <ValidityMessage messageKey={nicknameValidity} />}
    </div>
  );
};

export default ProfileContentItem;
