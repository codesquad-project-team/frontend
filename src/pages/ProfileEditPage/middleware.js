import { middleware as ImageEditorMiddleware } from '../../components/ImageEditor';
import { readFileAsDataURL } from '../../utils/utils';
import { createMiddleware } from '../../hooks/useMiddleware';

const addNewImage = async file => ({
  file,
  previewURL: await readFileAsDataURL(file)
});

const middleware = createMiddleware({
  ...ImageEditorMiddleware,
  addNewImage
});

export default middleware;
