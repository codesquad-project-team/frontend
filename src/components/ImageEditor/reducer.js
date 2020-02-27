export const cropImage = (
  images,
  { targetIndex, croppedFile, previewURL, cropperData }
) =>
  updateArrayWithObject({
    targetArray: images,
    index: targetIndex,
    updateData: {
      forUpload: croppedFile,
      previewURL,
      cropperData
    }
  });

const updateArrayWithObject = ({ targetArray, index, updateData }) =>
  targetArray.map((el, idx) => (idx === index ? { ...el, ...updateData } : el));
