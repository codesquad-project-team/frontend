import React from 'react';
import './SearchResultLists.scss';

const SearchResultLists = ({
  className,
  clickedMarkerIndex,
  setClickedMarkerIndex,
  searchResult,
  onClick: setClickedItemSelected,
  pagination
}) => {
  const makeResults = searchResult => {
    switch (searchResult) {
      case 'INITIAL':
        break;
      case 'ZERO_RESULT':
        return (
          <div className="search-result-lists-zero-result">
            검색결과가 없습니다.
          </div>
        );
      default:
        return searchResult.map((item, index) => (
          <div
            key={item.x}
            data-index={index}
            className={`search-result-lists-item ${
              clickedMarkerIndex === index
                ? 'search-result-lists-selected-item'
                : ''
            }`}
            onClick={setClickedItemSelected}
          >
            <div className="search-result-lists-name">{item.place_name}</div>
            <div className="search-result-lists-address">
              {item.address_name}
            </div>
          </div>
        ));
    }
  };
  const results = makeResults(searchResult);

  const gotoPrevPage = () => {
    pagination.prevPage();
    setClickedMarkerIndex('UNCLICKED');
  };

  const gotoNextPage = () => {
    pagination.nextPage();
    setClickedMarkerIndex('UNCLICKED');
  };

  return (
    <div className={className}>
      {results}
      {pagination && (pagination.hasPrevPage || pagination.hasNextPage) && (
        <div className="search-result-pagination">
          <button
            className="search-result-pagination-prev-btn"
            disabled={!pagination.hasPrevPage}
            onClick={gotoPrevPage}
          >
            이전
          </button>
          <span className="search-result-current-page-number">
            {pagination.current}
          </span>
          <button
            className="search-result-pagination-next-btn"
            disabled={!pagination.hasNextPage}
            onClick={gotoNextPage}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResultLists;
