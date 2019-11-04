import React, { useState, useEffect } from 'react';
import './useModal.scss';

const Modal = ({ className = '', onClick, children }) => {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    return () => (document.documentElement.style.overflow = 'unset');
  }, []);

  return (
    <>
      <div className="modal-background" onClick={onClick} />
      <div className={`modal-window ${className}`}>{children}</div>
    </>
  );
};

const useModal = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return { Modal, handleClick, open };
};

export default useModal;
