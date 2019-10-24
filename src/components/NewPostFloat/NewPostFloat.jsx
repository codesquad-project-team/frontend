import React from 'react';
import './NewPostFloat.scss';
import { Link } from 'react-router-dom';
import { NEW_POST_FLOAT_IMG_URL } from '../../configs';

const NewPostFloat = () => {
  return <img className="new-post-float" src={NEW_POST_FLOAT_IMG_URL}></img>;
};

export default NewPostFloat;
