import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './useModal.scss';

const cx = classNames.bind(styles);

const Modal = ({ className = '', onClick, children }) => {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    return () => (document.documentElement.style.overflow = 'unset');
  }, []);

  return (
    <>
      <div className={cx('modal-background')} onClick={onClick} />
      <div className={cx('modal-window', className)}>{children}</div>
    </>
  );
};

const useModal = () => {
  const [open, setOpen] = useState(false);
  const toggleModal = order => {
    switch (order) {
      case 'open':
        setOpen(true);
        break;
      case 'close':
        setOpen(false);
        break;
      default:
        setOpen(!open);
        break;
    }
  };

  return { Modal, toggleModal, open };
};

export default useModal;
