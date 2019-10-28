import React from 'react';
import './ProfileContentItem.scss';

const ProfileContentItem = props => {
  const { label, name, value, changeHandler } = props;
  return (
    <div className="profile-edit-page-content-item">
      <label>{label}</label>
      <input type="text" name={name} value={value} onChange={changeHandler} />
    </div>
  );
};

export default ProfileContentItem;
