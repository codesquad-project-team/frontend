import { useReducer } from 'react';

const reducer = (prevState, newState) => {
  return { ...prevState, ...newState };
};
const useUploadStatus = (images, isEditMode) => {
  const [
    { hasSelectedLocation, hasAllTitles, isOverDescLimit },
    setUploadStatus,
  ] = useReducer(reducer, isEditMode ? { hasSelectedLocation: true } : {});

  const isSubmitReady = () =>
    images.length && hasSelectedLocation && hasAllTitles && !isOverDescLimit;

  const showUploadFailReason = () => {
    switch (true) {
      case !images.length:
        alert('사진을 1개 이상 선택해주세요.');
        break;
      case !hasSelectedLocation:
        alert('장소검색 버튼을 눌러 장소를 선택해주세요.');
        break;
      case !hasAllTitles:
        alert('어디에서 누구랑 무엇을 했는지 알려주지 않을래요?');
        break;
      case isOverDescLimit:
        alert('설명을 1000자 이하로 입력해주세요.');
        break;
    }
  };
  return [setUploadStatus, isSubmitReady, showUploadFailReason];
};

export default useUploadStatus;
