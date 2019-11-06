import React from 'react';
import './CommonBtn.scss';
import PropTypes from 'prop-types';
import { getStyleClassName } from '../../utils/utils';

const CommonBtn = props => {
  const { children, className = '', styleType = 'none', ...restProps } = props;

  const styleClassName = getStyleClassName({
    props: styleType,
    prefix: `common-btn`
  });

  return (
    <button className={`${className} ${styleClassName}`} {...restProps}>
      {children}
    </button>
  );
};

export default CommonBtn;

CommonBtn.propTypes = {
  children: PropTypes.string
};
