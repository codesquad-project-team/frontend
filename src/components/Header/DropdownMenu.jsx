import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import CommonLink from '../CommonLink/CommonLink';
import { useLoginContext } from '../../contexts/LoginContext';
import { profilePage } from '../../utils/utils';
import useFetch from '../../hooks/useFetch';
import api from '../../api';
import styles from './DropdownMenu.scss';

const cx = classNames.bind(styles);

const DropdownMenu = ({ onClick: toggleDropdownMenu }) => {
  const { nickname, id, setLoggedIn, setUserInfo } = useLoginContext();
  const [showsMenu, setShowsMenu] = useState(false);

  const resetLocalUserInfo = () => {
    setLoggedIn(false);
    setUserInfo({});
    alert('로그아웃되었습니다.');
  };

  const showServerErrorMessage = () =>
    '서버에 문제가 있나봐요. 잠시 후에 다시 시도해주세요.';

  const { request } = useFetch({
    onRequest: api.requestLogout,
    onSuccess: resetLocalUserInfo,
    onError: {
      500: showServerErrorMessage
    }
  });

  const handleLogout = () => {
    if (!confirm('로그아웃 하시겠어요?')) return;
    request();
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
        <CommonLink to={profilePage(nickname, id)} onClick={toggleDropdownMenu}>
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
