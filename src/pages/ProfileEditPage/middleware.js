import { middleware as ImageEditorMiddleware } from '../../components/ImageEditor';
import { readFileAsDataURL } from '../../utils/utils';

const addNewImage = async file => ({
  file,
  previewURL: await readFileAsDataURL(file)
});

const middleware = {
  ...ImageEditorMiddleware,
  addNewImage
};

export default middleware;
