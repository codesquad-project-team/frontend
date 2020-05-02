import React from 'react';
import useModal from '../../../hooks/useModal';
import LocationFinder from './LocationFinder';
import LocationPreview from './LocationPreview';
import IconButton from '../../CommonBtn/IconButton';
import { IMAGE_BUCKET_URL } from '../../../configs';

const LocationUploader = ({
  state: {
    location: { latitude: lat, longitude: lng },
  },
  dispatch,
  setUploadStatus,
}) => {
  const hasSelectedLocation = !!lat;
  const { Modal, toggleModal, isOpen } = useModal();

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
      {isOpen && (
        <Modal onClick={toggleModal}>
          <LocationFinder
            toggleModal={toggleModal}
            dispatch={dispatch}
            setUploadStatus={setUploadStatus}
          />
        </Modal>
      )}
    </>
  );
};

export default LocationUploader;
