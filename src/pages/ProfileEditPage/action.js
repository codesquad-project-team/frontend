import { action as ImageEditorAction } from '../../components/ImageEditor';
import { readFileAsDataURL, createActionCreator } from '../../utils/utils';

const addNewImage = async file => ({
  type: 'addNewImage',
  payload: { file, previewURL: await readFileAsDataURL(file) }
});

const action = createActionCreator({
  ...ImageEditorAction,
  addNewImage
});

export default action;
