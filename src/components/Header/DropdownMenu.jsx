import React from 'react';
import './DropdownMenu.scss';
import CommonLink from '../CommonLink/CommonLink';

const DropdownMenu = ({ onClick }) => {
  return (
    <>
      <div className="drop-down-menu-wrapper" onClick={onClick} />
      <div className="drop-down-menu">
        <CommonLink to="/post/upload">
          <div className="drop-down-menu-post-upload-btn">글 작성</div>
        </CommonLink>
      </div>
    </>
  );
};

export default DropdownMenu;
