import React from 'react';
import './CloseBtn.scss';

const CloseBtn = ({ className = '', onClick, children, ...restProps }) => {
  return (
    <button
      className={`close-btn ${className}`}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default CloseBtn;
