import * as ImageUploadReducer from './ImageUploadReducer';
import * as ImageEditReducer from './ImageEditReducer';

const reducer = (state, { type, payload }) => {
  return {
    ...ImageEditReducer,
    ...ImageUploadReducer,
    updateLocation,
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

const updateLocation = (state, location) => {
  return { ...state, location, isEdited: true };
};

const updateTitle = (state, title) => {
  return { ...state, post: { ...state.post, ...title }, isEdited: true };
};

const updateDescription = (state, description) => {
  return { ...state, post: { ...state.post, description }, isEdited: true };
};
