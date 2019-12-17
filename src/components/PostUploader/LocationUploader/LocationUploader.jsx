import React from 'react';
import useModal from '../../../hooks/useModal';
import LocationFinder from './LocationFinder';
import LocationFindButton from './LocationFindButton';
import LocationPreview from './LocationPreview';

const LocationUploader = ({
  lat,
  lng,
  setSelectedLocation,
  setReadyToUpload,
  hasSelectedLocation
}) => {
  const { Modal, toggleModal, open } = useModal();

  return (
    <>
      {hasSelectedLocation ? (
        <LocationPreview lat={lat} lng={lng} onClick={toggleModal} />
      ) : (
        <LocationFindButton onClick={toggleModal}>장소검색</LocationFindButton>
      )}
      {open && (
        <Modal onClick={toggleModal}>
          <LocationFinder
            toggleModal={toggleModal}
            setSelectedLocation={setSelectedLocation}
            setReadyToUpload={setReadyToUpload}
          />
        </Modal>
      )}
    </>
  );
};

export default LocationUploader;
