export const cropImage = (
  images,
  { targetIndex, croppedFile, previewURL, cropperData }
) =>
  updateArrayWithData({
    targetArray: images,
    index: targetIndex,
    data: {
      forUpload: croppedFile,
      previewURL,
      cropperData
    }
  });

const updateArrayWithData = ({ targetArray, index, data }) =>
  targetArray.map((el, idx) => (idx === index ? { ...el, ...data } : el));
