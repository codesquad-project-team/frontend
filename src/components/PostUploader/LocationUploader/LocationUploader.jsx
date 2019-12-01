import React, { useState } from 'react';
import useModal from '../../../hooks/useModal';
import LocationFinder from './LocationFinder';
import LocationFindButton from './LocationFindButton';
import LocationPreview from './LocationPreview';

const LocationUploader = ({ lat, lng, setSelectedLocation }) => {
  const { Modal, handleClick, open } = useModal();
  const existsSelectedLocation = lat ? true : false;

  return (
    <>
      {existsSelectedLocation ? (
        <LocationPreview lat={lat} lng={lng} onClick={handleClick} />
      ) : (
        <LocationFindButton onClick={handleClick}>장소검색</LocationFindButton>
      )}
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
