import { pipe } from '../../utils/utils';

export const getLocalStorageImages = images =>
  images &&
  images.map(({ url, isRepresentative }) =>
    pipe(
      () => getFileInfo(url),
      ({ name, type }) =>
        createImageItem({
          originalFile: { name, type },
          originalURL: url,
          isRepresentative
        })
    )()
  );

const getFileInfo = src => {
  const name = src.split('/').pop();
  return { name, type: 'image/' + name.split('.').pop() };
};

export const addImages = (images, newImages) =>
  images.length
    ? [...images, ...newImages.map(newImage => createImageItem(newImage))]
    : initRepresentative([
        ...images,
        ...newImages.map(newImage => createImageItem(newImage))
      ]);

const createImageItem = ({
  originalFile,
  originalURL,
  croppedFile,
  previewURL,
  isRepresentative
}) => ({
  originalFile,
  originalURL,
  forUpload: croppedFile || originalFile,
  previewURL: previewURL || originalURL,
  isRepresentative: isRepresentative || false
});

const initRepresentative = images =>
  images.map((obj, idx) =>
    idx === 0 ? { ...obj, isRepresentative: true } : obj
  );

export const deleteImage = (images, targetIndex) =>
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

export const updateRepresentative = (images, targetIndex) => {
  return images.map((obj, idx) =>
    targetIndex === idx
      ? { ...obj, isRepresentative: true }
      : { ...obj, isRepresentative: false }
  );
};
