const reducer = ({ type, payload }) => image => {
  return { cropImage, addNewImage }[type](image, payload);
};

const cropImage = (image, { croppedFile, previewURL, cropperData }) => ({
  ...image,
  forUpload: croppedFile,
  previewURL,
  cropperData
});

const addNewImage = (image, { file, previewURL }) => ({
  original: file,
  originalURL: previewURL,
  forUpload: [file],
  previewURL
});

export default reducer;
