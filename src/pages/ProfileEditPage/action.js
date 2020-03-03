import { action as ImageEditorAction } from '../../components/ImageEditor';
import { readFileAsDataURL } from '../../utils/utils';

const addNewImage = async file => ({
  type: 'addNewImage',
  payload: { file, previewURL: await readFileAsDataURL(file) }
});

const action = async ({ type, payload }) =>
  await {
    ...ImageEditorAction,
    addNewImage
  }[type](payload);

export default action;
