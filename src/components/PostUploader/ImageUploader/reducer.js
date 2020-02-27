import { pipe } from '../../../utils/utils';

export const addImages = (images, newImages) =>
  images.length
    ? [...images, ...newImages]
    : initRepresentative([...images, ...newImages]);

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
