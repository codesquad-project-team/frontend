import { asyncPipe } from '../../../../utils/utils';

const CANVAS_OPTIONS = {
  maxWidth: 4096,
  maxHeight: 4096,
  fillColor: '#fff',
  imageSmoothingEnabled: false,
  imageSmoothingQuality: 'high'
};

export const UPDATE_IMAGE = (setImages, cropper, index, originalFile) => {
  asyncPipe(
    () => cropper.getCroppedCanvas(CANVAS_OPTIONS), //sync function
    canvas => convertCanvasToFile(canvas, originalFile), //async
    file => getPreviewURL(file), //async
    ({ forUpload, previewURL }) =>
      setImages(images =>
        updateArrayWithObject(images, index, { forUpload, previewURL })
      )
  )();
};

const getPreviewURL = async file => {
  const previewURL = await readFileAsDataURL(file);
  return { forUpload: file, previewURL };
};

const updateArrayWithObject = (array, index, item) =>
  array.map((el, idx) => (idx === index ? { ...el, ...item } : el));

const convertCanvasToFile = (canvasElement, originalFile) => {
  const { name, type } = originalFile;
  return new Promise(resolve => {
    canvasElement.toBlob(blob => {
      const file = new File([blob], name, { type });
      resolve(file);
    }, type);
  });
};

const readFileAsDataURL = file => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', ({ target }) => {
      resolve(target.result);
    });
    reader.readAsDataURL(file);
  });
};
