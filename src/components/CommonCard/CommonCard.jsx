import React from 'react';
import './CommonCard.scss';
import { getClassName } from '../../utils/utils';

const CommonCard = ({
  small,
  medium,
  large,
  className = '',
  children,
  ...restProps
}) => {
  const sizeClassName = getClassName({
    props: { small, medium, large },
    prefix: 'common-card'
  });
  return (
    <div className={`common-card ${sizeClassName} ${className}`} {...restProps}>
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

CommonCard.background = CommonBackground;

export default CommonCard;
