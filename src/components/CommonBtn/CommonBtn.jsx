import React from 'react';
import classNames from 'classnames/bind';
import styles from './CommonBtn.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const CommonBtn = props => {
  const {
    children,
    className = '',
    styleType = 'normal',
    ...restProps
  } = props;

  return (
    <button className={cx('main', className, styleType)} {...restProps}>
      <span>{children}</span>
    </button>
  );
};

export default CommonBtn;

CommonBtn.propTypes = {
  children: PropTypes.string
};
