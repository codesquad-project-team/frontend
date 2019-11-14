import React from 'react';
import useModal from '../../../hooks/useModal';
import LocationFinder from './LocationFinder';

const LocationUploader = () => {
  const { Modal, handleClick, open } = useModal();
  return (
    <>
      <button onClick={handleClick}>장소검색</button>
      {open && (
        <Modal onClick={handleClick}>
          <LocationFinder onClick={handleClick} />
        </Modal>
      )}
    </>
  );
};

export default LocationUploader;
