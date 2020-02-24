import React, { useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './IconButton.scss';

const cx = classNames.bind(styles);

const IconButton = ({
  type,
  onChange,
  children,
  className = '',
  multiple,
  src,
  ...props
}) => {
  const randomId = useMemo(() => ((Math.random() + 1) * 10e4) | 0, []);

  return (
    <div role="button" className={`${cx('wrapper')} ${className}`} {...props}>
      <label className={cx('label')} htmlFor={`add-image-button-${randomId}`}>
        <img className={cx('icon')} src={src} />
        {children}
      </label>
      {type === 'addImage' && (
        <input
          id={`add-image-button-${randomId}`}
          type="file"
          accept="image/*"
          className={cx('hidden')}
          onChange={onChange}
          multiple={multiple}
        />
      )}
    </div>
  );
};

export default IconButton;
