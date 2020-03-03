import * as ImageUploadReducer from './ImageUploadReducer';
import * as ImageEditReducer from './ImageEditReducer';

const reducer = ({ type, payload }) => images => {
  return { ...ImageEditReducer, ...ImageUploadReducer }[type](images, payload);
};
export const { getLocalStorageImages } = ImageUploadReducer;
export default reducer;
