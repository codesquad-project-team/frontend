import { asyncPipe, readFileAsDataURL } from '../../../../utils/utils';

const CANVAS_OPTIONS = {
  maxWidth: 4096,
  maxHeight: 4096,
  fillColor: '#fff',
  imageSmoothingEnabled: false,
  imageSmoothingQuality: 'high'
};

export const UPDATE_IMAGE = (setImages, cropper, index, { name, type }) => {
  const cropperData = cropper.getData();
  const canvas = cropper.getCroppedCanvas(CANVAS_OPTIONS); //sync function
  asyncPipe(
    canvas => convertCanvasToFile(canvas, { name, type }),
    async file => [file, await readFileAsDataURL(file)],
    ([forUpload, previewURL]) =>
      setImages(images =>
        updateArrayWithObject(images, index, {
          forUpload,
          previewURL,
          cropperData
        })
      )
  )(canvas);
};

const updateArrayWithObject = (array, index, item) =>
  array.map((el, idx) => (idx === index ? { ...el, ...item } : el));

const convertCanvasToFile = (canvasElement, { name, type }) => {
  return new Promise(resolve => {
    canvasElement.toBlob(blob => {
      const file = new File([blob], name, { type });
      resolve(file);
    }, type);
  });
};
