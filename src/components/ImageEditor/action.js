import { readFileAsDataURL } from '../../utils/utils';

const CANVAS_OPTIONS = {
  maxWidth: 4096,
  maxHeight: 4096,
  fillColor: '#fff',
  imageSmoothingEnabled: false,
  imageSmoothingQuality: 'high'
};

export const cropImage = async ({ cropper, name, type, targetIndex }) => {
  const cropperData = cropper.getData();
  const canvas = cropper.getCroppedCanvas(CANVAS_OPTIONS); //sync function
  const croppedFile = await convertCanvasToFile(canvas, { name, type });
  const previewURL = await readFileAsDataURL(croppedFile);
  return {
    type: 'cropImage',
    payload: {
      croppedFile,
      previewURL,
      cropperData,
      targetIndex
    }
  };
};

const convertCanvasToFile = (canvasElement, { name, type }) => {
  return new Promise(resolve => {
    canvasElement.toBlob(blob => {
      const file = new File([blob], name, { type });
      resolve(file);
    }, type);
  });
};
