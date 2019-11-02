import React, { useState } from 'react';
import useModal from './Modal';

const LocationUploader = () => {
  const { Modal, handleClick, open } = useModal();
  return (
    <div>
      <button onClick={handleClick}>장소검색</button>
      {open && (
        <Modal onClick={handleClick}>
          <div style={{ width: '100px', height: '100px', background: '#fff' }}>
            test
            <button onClick={handleClick}>close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LocationUploader;
