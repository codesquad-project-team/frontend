import React from 'react';
import './CommonBtn.scss';
import PropTypes from 'prop-types';

const CommonBtn = props => {
  return (
    <div className="common-btn">
      <button {...props}>{props.children}</button>
    </div>
  );
};

export default CommonBtn;

CommonBtn.propTypes = {
  children: PropTypes.string
};
