import React from 'react';
import './CommonBtn.scss';
import PropTypes from 'prop-types';

const CommonBtn = props => {
  const { className = '', ...restProps } = props;

  return (
    <button className={`common-btn ${className}`} {...restProps}>
      {props.children}
    </button>
  );
};

export default CommonBtn;

CommonBtn.propTypes = {
  children: PropTypes.string
};
