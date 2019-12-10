import React from 'react';
import './CommonBtn.scss';
import PropTypes from 'prop-types';

const CommonBtn = props => {
  const {
    children,
    className = '',
    styleType = 'normal',
    ...restProps
  } = props;

  const styleClassName = `common-btn-${styleType}`;

  return (
    <button
      className={`common-btn ${className} ${styleClassName}`}
      {...restProps}
    >
      <span>{children}</span>
    </button>
  );
};

export default CommonBtn;

CommonBtn.propTypes = {
  children: PropTypes.string
};
