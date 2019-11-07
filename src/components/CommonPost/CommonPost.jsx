import React from 'react';
import './CommonPost.scss';
import { getClassName } from '../../utils/utils';

const CommonPost = ({
  small,
  medium,
  large,
  className = '',
  children,
  ...restProps
}) => {
  const sizeClassName = getClassName({
    props: { small, medium, large },
    prefix: 'common-post'
  });
  return (
    <div className={`common-post ${sizeClassName} ${className}`} {...restProps}>
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
    <div className={`common-background ${className}`} {...restProps}>
      {children}
    </div>
  );
};

CommonPost.background = CommonBackground;

export default CommonPost;
