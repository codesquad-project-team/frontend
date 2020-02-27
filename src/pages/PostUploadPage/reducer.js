import { reducer as ImageUploaderReducer } from '../../components/PostUploader/ImageUploader';
import { reducer as ImageEditorReducer } from '../../components/ImageEditor';

const reducer = ({ type, payload }) => images => {
  return { ...ImageEditorReducer, ...ImageUploaderReducer }[type](
    images,
    payload
  );
};

export default reducer;
