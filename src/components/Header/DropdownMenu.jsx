import React, { useState, useEffect } from 'react';
import './DropdownMenu.scss';
import CommonLink from '../CommonLink/CommonLink';
import { useLoginContext } from '../../contexts/LoginContext';

const DropdownMenu = ({ onClick: toggleDropdownMenu }) => {
  const { nickname, id } = useLoginContext();
  const [showsMenu, setShowsMenu] = useState(false);

  useEffect(() => {
    setShowsMenu(true);
  }, []);

  return (
    <>
      <div className="drop-down-menu-wrapper" onClick={toggleDropdownMenu} />
      <div
        className={`drop-down-menu ${showsMenu && 'drop-down-menu-animation'}`}
      >
        <CommonLink to="/post/upload">
          <div className="drop-down-menu-btns">글 작성</div>
        </CommonLink>
        <CommonLink
          to={`/profile/@${nickname}`}
          onClick={() => localStorage.setItem('targetUserId', id)}
        >
          <div className="drop-down-menu-btns">내 프로필</div>
        </CommonLink>
        <CommonLink to="/profile/edit">
          <div className="drop-down-menu-btns">프로필 편집</div>
        </CommonLink>
        <CommonLink to="/">
          <div className="drop-down-menu-btns">로그아웃</div>
        </CommonLink>
      </div>
    </>
  );
};

export default DropdownMenu;
