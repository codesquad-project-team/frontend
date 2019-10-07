import React from 'react';
import './Header.scss';
import useInput from '../../hooks/useInput';
import ProfileImage from '../ProfileImage/ProfileImage';

const Header = () => {
  const [inputValue, handleChange, restore] = useInput();

  const handleSubmit = e => {
    e.preventDefault();
    restore('searchBar');
  };

  return (
    <div className="header">
      <h1>Logo</h1>
      <form onSubmit={handleSubmit}>
        <img
          className="header-searchbar-icon"
          src="./resources/magnifier_icon.png"
          alt=""
        />
        <input
          name="searchBar"
          value={inputValue.searchBar}
          onChange={handleChange}
        />
      </form>
      <ProfileImage small />
    </div>
  );
};

export default Header;
