import React from 'react';
import './DropdownMenu.scss';

const DropdownMenu = ({ onClick }) => {
  return (
    <>
      <div className="drop-down-menu-wrapper" onClick={onClick} />
      <div className="drop-down-menu">dropdown</div>
    </>
  );
};

export default DropdownMenu;
