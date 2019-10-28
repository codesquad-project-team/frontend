import React from 'react';
import './NewPostBtn.scss';
import { Link } from 'react-router-dom';
import { NEW_POST_BTN_IMG_URL } from '../../configs';

const NewPostBtn = () => {
  return <img className="new-post-btn" src={NEW_POST_BTN_IMG_URL} />;
};

export default NewPostBtn;
