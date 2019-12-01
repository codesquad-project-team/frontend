import React from 'react';
import './SearchResultLists.scss';
import { isEmptyArray } from '../../../utils/utils';

const SearchResultLists = ({
  className,
  selectedIndex,
  searchResult,
  handleClick
}) => {
  const results = isEmptyArray(searchResult) ? (
    <div className="search-result-lists-no-result">검색결과가 없습니다.</div>
  ) : (
    searchResult.map((item, index) => (
      <div
        key={item.x}
        data-index={index}
        className={`search-result-lists-item ${
          selectedIndex === index ? 'search-result-lists-selected-item' : ''
        }`}
        onClick={handleClick}
      >
        <div className="search-result-lists-name">{item.place_name}</div>
        <div className="search-result-lists-address">{item.address_name}</div>
      </div>
    ))
  );
  return <div className={className}>{results}</div>;
};

export default SearchResultLists;
