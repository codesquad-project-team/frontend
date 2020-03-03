import { readFileAsDataURL, asyncPipe } from '../../../utils/utils';

const CANVAS_OPTIONS = {
  maxWidth: 4096,
  maxHeight: 4096,
  fillColor: '#fff',
  imageSmoothingEnabled: false,
  imageSmoothingQuality: 'high'
};

export const addImages = ({ files, Cropper }) => async () => {
  const URLs = await getDataURLs(files);
  const newImages = await getNewImages(URLs, files, Cropper);
  return { type: 'addImages', payload: newImages };
};

/**
 * @returns {Promise} once resolved, returns an array of dataURLs.
 */
const getDataURLs = files =>
  Promise.all(files.map(file => readFileAsDataURL(file))).catch(err =>
    console.error(err)
  );

/**
 * @returns {Promise} once resolved, returns an array of objects, which represents added images.
 */
const getNewImages = (URLs, files, Cropper) =>
  //TODO: 이미지 하나하나 추가되도록 수정
  Promise.all(URLs.map(src => createImageElement(src)))
    .then(elements =>
      Promise.all(
        elements.map((imageElement, idx) =>
          isSquareImage(imageElement)
            ? Promise.resolve({ original: files[idx], originalURL: URLs[idx] })
            : createCroppedImageItem(
                imageElement,
                Cropper,
                files[idx],
                URLs[idx]
              )
        )
      )
    )
    .catch(err => console.error(err));

/**
 * @returns {Promise} once resolved, returns an HTMLImageElement.
 */
const createImageElement = src => {
  const div = document.createElement('div');
  const img = document.createElement('img');
  img.crossOrigin = 'Anonymous';
  img.src = src;
  div.appendChild(img); //needs to be wrapped to use cropper.js

  return new Promise(resolve => {
    img.onload = () => resolve(img); //to get width & height properties, returns element after onload.
  });
};

const isSquareImage = ({ width, height }) => width === height;

const createCroppedImageItem = async (
  imageElement,
  Cropper,
  originalFile,
  originalURL
) => {
  const croppedFile = await createCroppedFile(
    imageElement,
    Cropper,
    originalFile
  );
  const previewURL = await readFileAsDataURL(croppedFile);
  return { originalFile, originalURL, croppedFile, previewURL };
};

const createCroppedFile = (imageElement, Cropper, originalFile) =>
  new Promise(resolve => {
    const cropper = new Cropper(imageElement, {
      checkOrientation: false,
      aspectRatio: 1 / 1, //sets ratio of cropping area.
      autoCropArea: 1, //sets automatic cropping area size. 1 is maximum.
      ready() {
        asyncPipe(
          () => cropper.getCroppedCanvas(CANVAS_OPTIONS),
          canvas => convertCanvasToFile(canvas, originalFile),
          file => resolve(file)
        )();
      }
    });
  });

const convertCanvasToFile = (canvasElement, originalFile) => {
  const { name, type } = originalFile;
  return new Promise(resolve => {
    canvasElement.toBlob(blob => {
      const file = new File([blob], name, { type });
      resolve(file);
    }, type);
  });
};

export const deleteImage = targetIndex => ({
  type: 'deleteImage',
  payload: targetIndex
});

export const updateRepresentative = targetIndex => ({
  type: 'updateRepresentative',
  payload: targetIndex
});
