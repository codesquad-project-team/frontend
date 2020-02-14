import React from 'react';
import classNames from 'classnames/bind';
import styles from './CommonPost.scss';
import { getClassName } from '../../utils/utils';

const cx = classNames.bind(styles);

const CommonPost = ({
  small,
  medium,
  large,
  className = '',
  children,
  ...restProps
}) => {
  const sizeClassName = getClassName({ small, medium, large });
  return (
    <div className={cx('post', sizeClassName, className)} {...restProps}>
      {children}
    </div>
  );
};

export const CommonBackground = ({
  className = '',
  children,
  ...restProps
}) => {
  return (
    <div className={cx('background', className)} {...restProps}>
      {children}
    </div>
  );
};

CommonPost.background = CommonBackground;

export default CommonPost;
