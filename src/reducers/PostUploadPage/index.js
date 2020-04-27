import * as ImageUploadReducer from './ImageUploadReducer';
import * as ImageEditReducer from './ImageEditReducer';
import * as LocationUploadReducer from './LocationUploadReducer';

const reducer = (state, { type, payload }) => {
  return {
    ...ImageEditReducer,
    ...ImageUploadReducer,
    ...LocationUploadReducer,
    updateTitle,
    updateDescription,
    resetEditStatus,
  }[type](state, payload);
};
export const { getLocalStorageImages } = ImageUploadReducer;
export default reducer;

const resetEditStatus = (state) => {
  return { ...state, isEdited: false };
};

const updateTitle = (state, title) => {
  return { ...state, post: { ...state.post, ...title }, isEdited: true };
};

const updateDescription = (state, description) => {
  return { ...state, post: { ...state.post, description }, isEdited: true };
};
