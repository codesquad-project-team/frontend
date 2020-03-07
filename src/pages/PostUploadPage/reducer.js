import * as ImageUploadReducer from './ImageUploadReducer';
import * as ImageEditReducer from './ImageEditReducer';

const reducer = (images, { type, payload }) => {
  return { ...ImageEditReducer, ...ImageUploadReducer }[type](images, payload);
};
export const { getLocalStorageImages } = ImageUploadReducer;
export default reducer;
