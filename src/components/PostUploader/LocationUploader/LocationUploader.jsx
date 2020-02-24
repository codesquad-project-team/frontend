import React from 'react';
import useModal from '../../../hooks/useModal';
import LocationFinder from './LocationFinder';
import LocationPreview from './LocationPreview';
import IconButton from '../../CommonBtn/IconButton';
import { IMAGE_BUCKET_URL } from '../../../configs';

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
        <IconButton
          src={`${IMAGE_BUCKET_URL}/find-location-icon8.png`}
          onClick={toggleModal}
        >
          장소검색
        </IconButton>
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
