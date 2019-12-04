import React from 'react';
import './ProfileContentItem.scss';
import ValidityMessage from '../../pages/SignupPage/ValidityMessage';

const ProfileContentItem = props => {
  const { label, name, value, changeHandler, nicknameValidity = '' } = props;
  return (
    <div className={`profile-edit-page-content-item`}>
      <label>{label}</label>
      <input type="text" name={name} value={value} onChange={changeHandler} />
      {nicknameValidity && (
        <ValidityMessage nicknameValidity={nicknameValidity} />
      )}
    </div>
  );
};

export default ProfileContentItem;
