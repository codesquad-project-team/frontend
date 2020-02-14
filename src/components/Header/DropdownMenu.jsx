import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './DropdownMenu.scss';
import CommonLink from '../CommonLink/CommonLink';
import { useLoginContext } from '../../contexts/LoginContext';
import { WEB_SERVER_URL } from '../../configs';

const cx = classNames.bind(styles);

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
    } else {
      alert('서버에 문제가 있나봐요. 잠시 후에 다시 시도해주시겠어요?');
    }
  };

  const startOpeningAnimation = () => setShowsMenu(true);

  useEffect(() => {
    startOpeningAnimation();
  }, []);

  return (
    <>
      <div className={cx('background')} onClick={toggleDropdownMenu} />
      <div className={cx('wrapper', showsMenu && 'animation')}>
        <CommonLink to="/post/upload" onClick={toggleDropdownMenu}>
          <div className={cx('btns')}>글 작성</div>
        </CommonLink>
        <CommonLink
          to={`/profile/@${nickname}`}
          onClick={() => {
            localStorage.setItem('targetUserId', id);
            toggleDropdownMenu();
          }}
        >
          <div className={cx('btns')}>내 프로필</div>
        </CommonLink>
        <CommonLink to="/profile/edit">
          <div className={cx('btns')}>프로필 편집</div>
        </CommonLink>
        <div className={cx('btns')} onClick={handleLogout}>
          로그아웃
        </div>
      </div>
    </>
  );
};

export default DropdownMenu;
