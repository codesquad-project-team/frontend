import React from 'react';
import classNames from 'classnames/bind';
import styles from './SearchResultLists.scss';

const cx = classNames.bind(styles);

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
        return <div className={cx('zero-result')}>검색결과가 없습니다.</div>;
      default:
        return searchResult.map((item, index) => (
          <div
            key={item.x}
            data-index={index}
            className={cx(
              'item',
              clickedMarkerIndex === index ? 'selected-item' : ''
            )}
            onClick={setClickedItemSelected}
          >
            <div className={cx('placename')}>{item.place_name}</div>
            <div className={cx('address')}>{item.address_name}</div>
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
        <div className={cx('pagination')}>
          <button
            className={cx('pagination-prev-btn')}
            disabled={!pagination.hasPrevPage}
            onClick={gotoPrevPage}
          >
            이전
          </button>
          <span className={cx('current-page-number')}>
            {pagination.current}
          </span>
          <button
            className={cx('pagination-next-btn')}
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
