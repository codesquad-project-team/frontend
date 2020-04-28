import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './TitleUploader.scss';
import useInput from '../../../hooks/useInput';
import useDebounce from '../../../hooks/useDebounce';
import CompanionInput from './CompanionInput';
import useWidthAdjust from '../../../hooks/useWidthAdjust';

const cx = classNames.bind(styles);

const TitleUploader = ({
  state: {
    location: { name: placeName },
    post: { description, images, ...title },
  },
  dispatch,
  setUploadStatus,
}) => {
  const {
    inputValue,
    setInputValue,
    handleChange: handleInputChange,
  } = useInput(title);
  const { place, companion, activity } = inputValue;
  const [placeInputStyle] = useWidthAdjust(place);

  useEffect(() => {
    if (!placeName) return;
    setInputValue({ ...inputValue, place: placeName });
  }, [placeName]);

  useEffect(() => {
    updateTitles(place, companion, activity);
  }, [place, companion, activity]);

  const updateTitles = useDebounce((place, companion, activity) => {
    const isAllEmpty = !(place || companion || activity);
    if (isAllEmpty) return;

    dispatch({ type: 'updateTitle', payload: { place, companion, activity } });

    const hasAllTitles = place && companion && activity;
    hasAllTitles
      ? setUploadStatus({ hasAllTitles: true })
      : setUploadStatus({ hasAllTitles: false });
  });

  return (
    <div className={cx('wrapper')}>
      <div className={cx('place-section')}>
        <input
          type="text"
          placeholder="어디"
          name="place"
          value={place}
          className={cx('text-boxes')}
          onChange={handleInputChange}
          style={placeInputStyle}
        />
        <span>에서</span>
      </div>
      <span className={cx('companion-section')}>
        <CompanionInput
          className={cx('text-boxes')}
          value={companion}
          onChange={handleInputChange}
        />
      </span>
      <input
        type="text"
        placeholder="뭐하기"
        name="activity"
        className={cx('text-boxes')}
        value={activity}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TitleUploader;
