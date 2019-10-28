import React from 'react';
import './NewPostBtn.scss';
import { Link } from 'react-router-dom';
import { IMAGE_BUCKET_URL } from '../../configs';

const NewPostBtn = () => {
  return (
    <img
      className="new-post-btn"
      src={`${IMAGE_BUCKET_URL}/new-post-btn-image.jpeg`}
    />
  );

export default NewPostBtn;
