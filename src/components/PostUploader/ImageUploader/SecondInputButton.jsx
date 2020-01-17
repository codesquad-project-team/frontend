import React from 'react';
import classNames from 'classnames/bind';
import styles from './SecondInputButton.scss';

const cx = classNames.bind(styles);

const SecondInputButton = ({ onChangeHandler }) => {
  return (
    <div className={cx('wrapper')}>
      <label className={cx('label')} htmlFor="second-input">
        +
      </label>
      <input
        className={cx('btn')}
        id="second-input"
        type="file"
        accept="image/*"
        onChange={onChangeHandler}
        multiple
      />
    </div>
  );
};

export default SecondInputButton;
