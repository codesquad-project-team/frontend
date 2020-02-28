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
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = order => {
    switch (order) {
      case 'open':
        setIsOpen(true);
        break;
      case 'close':
        setIsOpen(false);
        break;
      default:
        setIsOpen(!isOpen);
        break;
    }
  };

  return { Modal, toggleModal, isOpen };
};

export default useModal;
