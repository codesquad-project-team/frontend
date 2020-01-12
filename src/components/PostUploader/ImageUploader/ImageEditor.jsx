import React from 'react';
import classNames from 'classnames/bind';
import styles from './ImageEditor.scss';
import CommonPost from '../../CommonPost/CommonPost';

const cx = classNames.bind(styles);

const ImageEditor = ({ onClick }) => {
  return (
    <CommonPost large>
      <button onClick={onClick}>click</button>
    </CommonPost>
  );
};

export default ImageEditor;
