import React, { useState, useEffect } from 'react';
import './DropdownMenu.scss';
import CommonLink from '../CommonLink/CommonLink';
import { useLoginContext } from '../../contexts/LoginContext';

const DropdownMenu = ({ onClick }) => {
  const { nickname } = useLoginContext();
  const [showsMenu, setShowsMenu] = useState(false);

  useEffect(() => {
    setShowsMenu(true);
  }, []);

  return (
    <>
      <div className="drop-down-menu-wrapper" onClick={onClick} />
      <div className={`drop-down-menu ${showsMenu && 'drop-down-menu-show'}`}>
        <CommonLink to="/post/upload">
          <div className="drop-down-menu-btns">글 작성</div>
        </CommonLink>
        <CommonLink to={`/profile/@${nickname}`}>
          {/* TODO: NavigationContext로 setUserId(id)필요 */}
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
