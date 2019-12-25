import React, { useState, useEffect } from 'react';
import './DropdownMenu.scss';
import CommonLink from '../CommonLink/CommonLink';
import { useLoginContext } from '../../contexts/LoginContext';
import { WEB_SERVER_URL } from '../../configs';

const DropdownMenu = ({ onClick: toggleDropdownMenu }) => {
  const { nickname, id, setLoggedIn, setUserInfo } = useLoginContext();
  const [showsMenu, setShowsMenu] = useState(false);

  const handleLogout = async () => {
    const res = await fetch(`${WEB_SERVER_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    if (res.ok) {
      setLoggedIn(false);
      setUserInfo({});
      alert('로그아웃되었습니다.');
    }
  };

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
        <div className="drop-down-menu-btns" onClick={handleLogout}>
          로그아웃
        </div>
      </div>
    </>
  );
};

export default DropdownMenu;
