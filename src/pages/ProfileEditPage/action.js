import { action as ImageEditorAction } from '../../components/ImageEditor';
import { readFileAsDataURL } from '../../utils/utils';

const addNewImage = ({ file }) => async () => ({
  type: 'addNewImage',
  payload: { file, previewURL: await readFileAsDataURL(file) }
});

const action = {
  ...ImageEditorAction,
  addNewImage
};
export default action;
