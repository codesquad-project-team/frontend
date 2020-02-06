import { pipe } from '../../../utils/utils';

export const ADD_IMAGES = async (setImages, imagesQuantity, files) => {
  const URLs = await getDataURLs(files);
  imagesQuantity
    ? setImages(images => addImages({ images, files, URLs }))
    : setImages(images => addImagesOnFirstTime({ images, files, URLs }));
};

/**
 * @returns {Promise}
 */
const getDataURLs = files =>
  Promise.all(files.map(file => readFileAsDataURL(file))).catch(err =>
    console.error(err)
  );

/**
 * @returns {Promise}
 */
const readFileAsDataURL = file =>
  new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', ({ target }) => {
      resolve(target.result);
    });
    reader.readAsDataURL(file);
  });

const addImagesOnFirstTime = ({ images, files, URLs }) =>
  pipe(addImages, initRepresentative)({ images, files, URLs });

const addImages = ({ images, files, URLs }) => [
  ...images,
  ...files.map((file, idx) => ({
    original: file,
    forUpload: file,
    previewURL: URLs[idx],
    isRepresentative: false
  }))
];

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
