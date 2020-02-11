import { pipe, readFileAsDataURL, asyncPipe } from '../../../utils/utils';

const CANVAS_OPTIONS = {
  maxWidth: 4096,
  maxHeight: 4096,
  fillColor: '#fff',
  imageSmoothingEnabled: false,
  imageSmoothingQuality: 'high'
};

export const GET_IMAGES = images =>
  images &&
  images.map(({ url, isRepresentative }) =>
    pipe(
      () => getFileInfo(url),
      ({ name, type }) =>
        createImageItem({
          original: { name, type },
          originalURL: url,
          isRepresentative
        })
    )()
  );

const getFileInfo = src => {
  const name = src.split('/').pop();
  return { name, type: 'image/' + name.split('.').pop() };
};

export const ADD_IMAGES = async (setImages, hasImages, files, Cropper) => {
  const URLs = await getDataURLs(files);
  const newImages = await getNewImages(URLs, files, Cropper);
  hasImages
    ? setImages(images => addImages({ images, newImages }))
    : setImages(images => addImagesOnFirstTime({ images, newImages }));
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
  Promise.all(URLs.map(src => createImageElement(src))).then(elements =>
    Promise.all(
      elements.map((imageElement, idx) =>
        isSquareImage(imageElement)
          ? Promise.resolve(
              createImageItem({ original: files[idx], originalURL: URLs[idx] })
            )
          : createCroppedImageItem(imageElement, Cropper, files[idx], URLs[idx])
      )
    )
  );

const addImagesOnFirstTime = ({ images, newImages }) =>
  pipe(addImages, initRepresentative)({ images, newImages });

const addImages = ({ images, newImages }) => [...images, ...newImages];

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
  return createImageItem({
    original: originalFile,
    originalURL,
    forUpload: croppedFile,
    previewURL
  });
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

const createImageItem = ({
  original,
  originalURL,
  forUpload,
  previewURL,
  isRepresentative
}) => ({
  original,
  originalURL,
  forUpload: forUpload || original,
  previewURL: previewURL || originalURL,
  isRepresentative: isRepresentative || false
});

const initRepresentative = images =>
  images.map((obj, idx) =>
    idx === 0 ? { ...obj, isRepresentative: true } : obj
  );

export const DELETE_IMAGE = targetIndex => images =>
  targetIndex === getRepresentativeIndex(images)
    ? pipe(
        images => removeItem(images, targetIndex),
        images => initRepresentative(images)
      )(images)
    : removeItem(images, targetIndex);

const getRepresentativeIndex = images =>
  images.findIndex(item => item.isRepresentative);

const removeItem = (arr, targetIndex) =>
  arr.filter((el, idx) => idx !== targetIndex);

export const UPDATE_REPRESENTATIVE = targetIndex => images =>
  images.map((obj, idx) =>
    targetIndex === idx
      ? { ...obj, isRepresentative: true }
      : { ...obj, isRepresentative: false }
  );