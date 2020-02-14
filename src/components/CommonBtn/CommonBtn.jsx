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
    <button className={cx('common', className, styleType)} {...restProps}>
      <span>{children}</span>
    </button>
  );
};

export default CommonBtn;

CommonBtn.propTypes = {
  styleType: PropTypes.oneOf(['normal', 'emphasize', 'underline', 'none', ''])
};
