import React from 'react';
import useModal from '../../../hooks/useModal';
import LocationFinder from './LocationFinder';
import LocationFindButton from './LocationFindButton';

const LocationUploader = ({ setSelectedLocation }) => {
  const { Modal, handleClick, open } = useModal();
  return (
    <>
      <LocationFindButton onClick={handleClick}>장소검색</LocationFindButton>
      {open && (
        <Modal onClick={handleClick}>
          <LocationFinder
            closeModal={handleClick}
            setSelectedLocation={setSelectedLocation}
          />
        </Modal>
      )}
    </>
  );
};

export default LocationUploader;
